
export default function ProgressBar({ disp, value }) {
    // console.log(value)
    return (
        <div className="flex-1 mb-5 rounded-sm bg-gray-800">
            <div className={` h-full rounded-sm bg-gradient-to-r from-cyan-950 to-cyan-700 `} style={{ width: value + "%" }} >

                <div className="absolute flex items-center">
                    <div className="basis-1/2 flex flex-col items-center" >
                        <span className="text-3xl font-semibold">{disp}</span>
                        <p className="text-xs">
                            Empaques:
                        </p>
                    </div>
                    <div className="flex basis-1/2 flex-col items-center">
                        <span className="text-3xl font-semibold">{value}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
