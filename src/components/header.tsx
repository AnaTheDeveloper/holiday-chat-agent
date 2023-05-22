

export default function Header() {

    return (
        <div
        id="headerContainer"
        className="flex flex-col border-2 border-green-600 h-1/5 w-full"
      >
        <div
          id="title"
          className="flex h-2/4 w-full items-center justify-between bg-violet-950 text-white"
        >
          <p className="font-bold text-lg">First Holiday Ltd</p>
        </div>
        <div
          id="subTitle"
          className="flex h-2/4 w-full items-center justify-center"
        >
          <p className="underline text-base font-semibold">Holiday Chat Agent</p>
        </div>
      </div>

    )


}
