import CalenderView from "./_components/calender-view";

export default function Home() {
  return (
    <div className='flex flex-col px-6 overflow-hidden'>
      <div>
        <h1 className='text-lg'>Select booking</h1>
        <div className='max-h-full '>
          <CalenderView />
        </div>
      </div>
    </div>
  );
}
