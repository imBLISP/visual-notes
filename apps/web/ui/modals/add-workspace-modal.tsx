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
import useWorkspaces from "@/lib/swr/use-workspaces";
import createWorkspace from "@/lib/transactions/create-workspace";
import { useParams } from "next/navigation";
import { uploadFile } from "@/lib/uploadThing/uploadImage";
import FormImage from "@/ui/forms/form-image";
import Image from "next/image";

// Helper function to convert data URL to File object
function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const formSchema = WorkspaceSchema.pick({
  name: true,
  logo: true
}).required();

function AddWorkspaceModal({
  showAddWorkspaceModal,
  setShowAddWorkspaceModal,
}: {
  showAddWorkspaceModal: boolean;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
  // hooks start
  const { upload } = uploadFile();
  const dialogRef = useRef(null);
  const { mutate: mutateWorkspaces } = useWorkspaces();
  const [show, setShow] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  // hooks end
  useEffect(() => {
    setShow(showAddWorkspaceModal);
  }, [showAddWorkspaceModal]);

  async function onSubmit(newWorkspace: z.infer<typeof formSchema>) {
    if (newWorkspace.logo === "") {
      newWorkspace.logo = "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=" + newWorkspace.name;
    }
    else {
      // upload image to uploadThing and get the url and replace logo with the url
      newWorkspace.logo = await upload(newWorkspace.logo, 'workspace_logo.png');
    }

    const transaction = createWorkspace(newWorkspace);

    fetch("/api/saveTransactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    }).then(
      function (data) {
        mutateWorkspaces();
        toast.success(`Workspace ${newWorkspace.name} created`);
        setShowAddWorkspaceModal(false)
      }
    ).catch((error) => {
      console.error("Error creating workspace", error);
      toast.error("Error creating workspace");
    });
  }

  const handleImageChange = (image: string) => {
    form.setValue("logo", image);
  };

  return (
    <Dialog
      open={showAddWorkspaceModal}
      onOpenChange={(open) => {
        setShow(open);
        dialogRef.current?.setAttribute("data-state", open ? "open" : "closed");
      }}
    >
      <DialogContent
        ref={dialogRef}
        onAnimationEndCapture={() => {
          setShowAddWorkspaceModal(show);
        }}
        className="flex flex-col items-center justify-center px-0 w-[450px]"
      >
        <div className="w-full border-b flex justify-center pb-6">
          <div className="text-lg font-medium">
            Create a new workspace
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
                  <FormImage handleImageChange={handleImageChange} />
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
              Create workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function useAddWorkspaceModal() {
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);

  const AddWorkspaceModalCallback = useCallback(() => {
    return (
      <AddWorkspaceModal
        showAddWorkspaceModal={showAddWorkspaceModal}
        setShowAddWorkspaceModal={setShowAddWorkspaceModal}
      />
    );
  }, [showAddWorkspaceModal, setShowAddWorkspaceModal]);

  return useMemo(
    () => ({
      setShowAddWorkspaceModal: setShowAddWorkspaceModal,
      ShowAddWorkspaceModal: AddWorkspaceModalCallback,
    }),
    [setShowAddWorkspaceModal, AddWorkspaceModalCallback]
  );
}
