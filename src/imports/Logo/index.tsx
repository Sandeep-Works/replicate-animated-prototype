function Frame() {
  return (
    <div className="absolute left-[45px] overflow-clip size-[90px] top-[41px]">
      <div className="absolute flex items-center justify-center left-[27.73px] size-[34.533px] top-[8px]">
        <div className="flex-none rotate-180">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
      <div className="absolute bg-[#d9d9d9] left-[27.73px] rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px] top-[47px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-[157px] overflow-clip size-[90px] top-[41px]">
      <div className="absolute flex items-center justify-center left-[47px] size-[34.533px] top-[28px]">
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[8px] size-[34.533px] top-[28px]">
        <div className="flex-none rotate-90">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[269px] overflow-clip size-[90px] top-[41px]">
      <div className="absolute flex items-center justify-center left-[28px] size-[34.533px] top-[47.27px]">
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[28px] size-[34.533px] top-[9px]">
        <div className="flex-none rotate-90">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute left-[379px] overflow-clip size-[90px] top-[41px]">
      <div className="absolute flex items-center justify-center left-[8px] size-[34.533px] top-[28px]">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[47px] size-[34.533px] top-[28px]">
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] relative rounded-bl-[1.644px] rounded-br-[9.867px] rounded-tl-[9.867px] rounded-tr-[9.867px] size-[34.533px]" />
        </div>
      </div>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="bg-white relative size-full" data-name="logo">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}