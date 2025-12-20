const ThumbnailDashboard = () => {
  return (
    <div>
      <h1 className="flex justify-row justify-col justify-center text-5xl bold italic">
        A smarter way to
      </h1>
      <h1 className="flex  justify-row justify-col justify-center text-5xl bold italic">
        grow and move ahead,
      </h1>
      <div className="text-xl text-gray-400 mt-2.5 py-16 flex  flex-col  justify-center items-center ">
        <p>Our aim to deliver premium-quality thumbnails,</p>
        <p>with precise, platform-perfect aspect ratios.</p>
        <button className="bg-neutral-700 mt-5 py-5 rounded-full h-14 w-xs hover:bg-gray-900 transition-all hover:text-2xl tracking-normal
        ">
        Click here
      </button>
      </div>
    </div>
  );
};

export default ThumbnailDashboard;
