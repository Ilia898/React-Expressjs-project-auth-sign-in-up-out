function Header() {
  return (
    <div className="mt-24 text-center text-white">
      <h1 className="font-bold text-4xl text">
        <span className="mr-4 bg-clip-text text-transparent bg-gradient-to-r from-text-gradient1  to-text-gradient2 to-30% ">
          {"{Code}"}
        </span>
        Example
      </h1>
      <p className="my-3 font-bold text-xl text-center">
        Full Stack Development: <br /> Registration and Login
      </p>
      <a
        href=""
        className="mt-3 font-medium underline underline-offset-4 cursor-pointer"
      >
        GitHub Link
      </a>
    </div>
  );
}

export default Header;
