import { Oval } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
    )
}