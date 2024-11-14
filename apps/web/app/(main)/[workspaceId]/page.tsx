import Canvas from "@/ui/canvas/canvas";
import Sidebar from "@/ui/layout/sidebar";
import Navbar from "@/ui/layout/navbar";

export default function Home() {
  return (
    <>
      <div className="h-full w-full">
          <Sidebar>
            {/* <Navbar/> */}
            <Canvas/>
          </Sidebar>
      </div>
    </>
  );
}
