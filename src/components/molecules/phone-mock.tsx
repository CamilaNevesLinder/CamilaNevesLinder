const PHONE_FRAME_CLASSNAME =
  'border-espresso bg-paper h-[200px] w-[112px] rounded-[26px] border-2 p-2.5';
const SKELETON_LINE_CLASSNAME = 'bg-line-strong h-2 rounded';

export function PhoneMock() {
  return (
    <div
      aria-hidden="true"
      className="relative flex translate-y-7 items-end gap-[18px]"
    >
      <div className={`${PHONE_FRAME_CLASSNAME} -rotate-6`}>
        <div className="bg-(--project-color) h-8 rounded-[10px]" />
        <div className={`${SKELETON_LINE_CLASSNAME} mt-2.5 w-[70%]`} />
        <div className={`${SKELETON_LINE_CLASSNAME} mt-1.5 w-1/2`} />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="bg-sand h-[38px] rounded-lg" />
          <div className="bg-sand h-[38px] rounded-lg" />
          <div className="bg-sand h-[38px] rounded-lg" />
          <div className="bg-sand h-[38px] rounded-lg" />
        </div>
      </div>
      <div className={`${PHONE_FRAME_CLASSNAME} rotate-5 -translate-y-3.5`}>
        <div className="flex items-center gap-1.5">
          <div className="bg-(--project-color) size-[22px] rounded-full" />
          <div className={`${SKELETON_LINE_CLASSNAME} flex-1`} />
        </div>
        <div className="bg-sand mt-2.5 h-[66px] rounded-[10px]" />
        <div className={`${SKELETON_LINE_CLASSNAME} mt-2 w-4/5`} />
        <div className={`${SKELETON_LINE_CLASSNAME} mt-1.5 w-3/5`} />
      </div>
    </div>
  );
}
