const SKELETON_LINE_CLASSNAME = 'bg-line-strong h-2 rounded';
const WINDOW_DOT_CLASSNAME = 'bg-line-strong size-[9px] rounded-full';

export function BrowserMock() {
  return (
    <div
      aria-hidden="true"
      className="border-espresso bg-paper relative h-[170px] w-[78%] translate-y-3.5 overflow-hidden rounded-t-[14px] border-2 border-b-0"
    >
      <div className="border-line flex gap-1.5 border-b-[1.5px] px-3 py-2.5">
        <span className={WINDOW_DOT_CLASSNAME} />
        <span className={WINDOW_DOT_CLASSNAME} />
        <span className={WINDOW_DOT_CLASSNAME} />
      </div>
      <div className="flex gap-3 p-3.5">
        <div className="flex w-14 flex-col gap-2">
          <div className="bg-(--project-color) h-2 rounded" />
          <div className={SKELETON_LINE_CLASSNAME} />
          <div className={SKELETON_LINE_CLASSNAME} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="bg-sand h-11 rounded-lg" />
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-sand-light h-8 rounded-md" />
            <div className="bg-sand-light h-8 rounded-md" />
            <div className="bg-sand-light h-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
