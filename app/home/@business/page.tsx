export default function Page() {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-gray-900 px-5 py-5">
      <div
        className="w-full rounded bg-gray-800 px-5 py-5 text-gray-500 shadow-xl lg:w-1/2"
        x-data="{chartData:chartData()}"
        x-init="chartData.fetch()"
      >
        <div className="flex flex-wrap items-end">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">Income</h3>
          </div>
          <div className="relative">
            <button className="h-6 text-xs hover:text-gray-300 focus:outline-none">
              <span x-text="chartData.options[chartData.selectedOption].label"></span>
              <i className="mdi mdi-chevron-down ml-1"></i>
            </button>
            <div className="absolute right-0 top-auto z-30 -mr-3 mt-1 w-32 min-w-full rounded bg-gray-700 text-sm shadow-lg">
              <span className="absolute right-0 top-0 -mt-1 mr-3 h-3 w-3 rotate-45 transform bg-gray-700"></span>
              <div className="relative z-10 w-full rounded bg-gray-700 py-1">
                <ul className="list-reset text-xs">
                  <template x-for="(item,index) in chartData.options">
                    <li className="cursor-pointer px-4 py-2 transition-colors duration-100 hover:bg-gray-600 hover:text-white">
                      <span x-text="item.label"></span>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-end">
          <h4
            className="mr-2 inline-block text-2xl font-semibold leading-tight text-white lg:text-3xl"
            x-text="'$'+(chartData.data?chartData.data[chartData.date].total.comma_formatter():0)"
          >
            0
          </h4>
          <span className="inline-block">
            <span x-text="chartData.data&&chartData.data[chartData.date].upDown<0?'▼':'▲'">
              0
            </span>{" "}
            <span x-text="chartData.data?chartData.data[chartData.date].upDown:0">
              0
            </span>
            %
          </span>
        </div>
        <div>
          <canvas id="chart" className="w-full"></canvas>
        </div>
      </div>
    </div>
  );
}
