import {
  Dialog,
  DialogContent,
  Form,
  Button,
  FormMessage,
  FormDescription,
  FormControl,
  FormItem,
  FormLabel,
  Input,
  FormField,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspaces";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import useWorkspace from "@/lib/swr/use-workspace";
import useWorkspaces from "@/lib/swr/use-workspaces";
import updateWorkspace from "@/lib/transactions/update-workspace";

const formSchema = WorkspaceSchema.omit({
  id: true,
});

function EditWorkspaceModal({
  showEditWorkspaceModal,
  setShowEditWorkspaceModal,
}: {
  showEditWorkspaceModal: boolean;
  setShowEditWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
  // get workspace id from url
  const { workspaceId } = useParams();
  const { workspace} = useWorkspace(workspaceId as string); 
  const { mutate: mutateWorkspaces } = useWorkspaces();

  const dialogRef = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(showEditWorkspaceModal);
  }, [showEditWorkspaceModal]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workspace?.name,
      logo: workspace?.logo,
    },
  });

  function onSubmit(editedWorkspace: z.infer<typeof formSchema>) {
    if (editedWorkspace.logo === "") {
      editedWorkspace.logo = "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=" + editedWorkspace.name;
    }

    const transaction = updateWorkspace(editedWorkspace, workspaceId as string)

    fetch(`/api/saveTransactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
    }).then(
      function (data) {
        mutateWorkspaces();
        toast.success(`Workspace ${editedWorkspace.name} edited`);
        setShowEditWorkspaceModal(false)
      }
    );
  }

  return (
    <Dialog
      open={showEditWorkspaceModal}
      onOpenChange={(open) => {
        setShow(open);
        dialogRef.current?.setAttribute("data-state", open ? "open" : "closed");
      }}
    >
      <DialogContent
        ref={dialogRef}
        onAnimationEndCapture={() => {
          setShowEditWorkspaceModal(show);
        }}
        className="flex flex-col items-center justify-center px-0 w-[450px]"
      >
        <div className="w-full border-b flex justify-center pb-6">
          <div className="text-lg font-medium">
            Edit workspace
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-2/3 pb-10"
          >

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center items-center py-2">
                  <Avatar className="h-[100px] w-[100px]">
                    <AvatarImage src={workspace?.logo} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center items-start pb-6">
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" placeholder="acme." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your workspace display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full items-center justify-center"
              type="submit"
            >
              Save workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function useEditWorkspaceModal() {
  const [showEditWorkspaceModal, setShowEditWorkspaceModal] = useState(false);

  const EditWorkspaceModalCallback = useCallback(() => {
    return (
      <EditWorkspaceModal
        showEditWorkspaceModal={showEditWorkspaceModal}
        setShowEditWorkspaceModal={setShowEditWorkspaceModal}
      />
    );
  }, [showEditWorkspaceModal, setShowEditWorkspaceModal]);

  return useMemo(
    () => ({
      setShowEditWorkspaceModal: setShowEditWorkspaceModal,
      ShowEditWorkspaceModal: EditWorkspaceModalCallback,
    }),
    [setShowEditWorkspaceModal, EditWorkspaceModalCallback]
  );
}
