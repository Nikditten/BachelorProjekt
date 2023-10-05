import { FC, PropsWithChildren } from "react";

const AuthenticationContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-screen w-screen relative">
      <div className="h-3/4 w-3/4 md:w-96 rounded-xl shadow-2xl shadow-black bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 p-8">
        <h1 className="w-full text-center text-4xl font-light">Analytics</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthenticationContainer;
