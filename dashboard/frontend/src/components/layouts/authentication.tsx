import { FC, PropsWithChildren } from "react";

const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="relative w-screen h-screen">
      <div className="absolute flex flex-col w-3/4 p-8 bg-white shadow-2xl h-3/4 md:w-96 rounded-xl shadow-gray-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
        <h1 className="w-full text-4xl font-light text-center">Analytics</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthenticationLayout;
