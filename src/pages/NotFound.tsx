import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="scanlines flex min-h-screen items-center px-4 py-16 md:px-8">
      <pre className="mx-auto w-full max-w-3xl whitespace-pre-wrap break-words text-xs leading-relaxed text-term-text md:text-sm">
        <span className="text-term-red">
          Kernel panic - not syncing: VFS: Unable to mount page "{location.pathname}"
        </span>
        {`
CPU: 0 PID: 404 Comm: browser Not tainted 6.12.0-yanct
Call trace:
 dump_backtrace+0x0/0x1e0
 show_stack+0x18/0x24
 page_not_found+0x404/0x404
 you_took_a_wrong_turn+0x42/0x42
---[ end Kernel panic ]---

`}
        <a href="/" className="text-term-green underline underline-offset-4 hover:brightness-125">
          $ reboot  # take me home
        </a>
      </pre>
    </main>
  );
};

export default NotFound;
