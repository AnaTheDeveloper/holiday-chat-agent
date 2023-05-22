export default function Header() {
  return (
    <div
      id="headerContainer"
      className="flex flex-col h-1/5 w-full"
    >
      <div
        id="title"
        className="flex h-2/4 w-full px-2 py-1 items-center justify-between bg-violet-950"
      >
        <p className="text-white text-lg font-bold tracking-wide">First Holiday Ltd</p>
      </div>
      <div
        id="subTitle"
        className="flex h-2/4 w-full px-2 py-0.5 items-center justify-center"
      >
        <p className="underline text-base font-semibold">Holiday Chat Agent</p>
      </div>
    </div>
  );
}
