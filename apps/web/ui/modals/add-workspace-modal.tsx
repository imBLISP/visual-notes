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

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

// export function ProfileForm() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values)
//   }
// }

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function AddWorkspaceModal({
  showAddWorkspaceModal,
  setShowAddWorkspaceModal,
}: {
  showAddWorkspaceModal: boolean;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
  const dialogRef = useRef(null);
  //   const overlayRef = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(showAddWorkspaceModal);
  }, [showAddWorkspaceModal]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog
      open={showAddWorkspaceModal}
      // onOpenChange={setShowAddWorkspaceModal}
      onOpenChange={(open) => {
        console.log("setting show", open);
        setShow(open);
        dialogRef.current?.setAttribute("data-state", open ? "open" : "closed");
        // overlayRef.current?.setAttribute("data-state", open? "open": "closed");
      }}
    >
      {/* <DialogOverlay ref={overlayRef} onAnimationEndCapture={() => {
            console.log('overlay animation finished');
        }} /> */}
      <DialogContent
        ref={dialogRef}
        onAnimationEndCapture={() => {
          console.log("content animation finished");
          // console.log('setting open', show);
          setShowAddWorkspaceModal(show);
        }}
        className="flex flex-col items-center justify-center px-0 w-[450px]"
      >
        {/* <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader> */}
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
              name="username"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center items-center py-2">
                  <Avatar className="h-[100px] w-[100px]">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* <FormLabel>Workspace name</FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" placeholder="acme." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your workspace display name.
                  </FormDescription>
                  <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
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
