import { useI18n } from '@/locales/client';
import { TbMessageCircleCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineLock } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Help = () => {
  const t = useI18n();

  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
          <TbMessageCircleCheck className="h-5 w-5" />
          <span className="text-sm font-medium">{t("header.help.Support")}</span>
        </div>
      </HoverCardTrigger>
      
      
      <HoverCardContent 
        className="w-64 p-2 relative shadow-lg mt-3 border border-gray-200 rounded-lg" 
        sideOffset={1}
        align="center"
        side="bottom"
      >

        {/* Flèche centrée pointant vers le trigger */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200 z-10"></div>

        <div className="space-y-2">
          
          <div className="space-y-1">
            <div 
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <BiSupport className="h-4 w-4 mr-2" />
              <span className="text-sm">{t("header.help.Support_center")}</span>
            </div>
            
            <div
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <AiOutlineSafety className="h-4 w-4 mr-2" />
              <span className="text-sm">{t("header.help.Safety_center")}</span>
            </div>

            <div 
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <TbMessageCircleCheck className="h-4 w-4 mr-2" />
              <span className="text-sm">{t("header.help.Chat_with_TÜMO")}</span>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-100 my-1"></div>

            <div 
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <MdOutlineLock className="h-4 w-4 mr-2" />
              <span className="text-sm">{t("header.help.Privacy_policy")}</span>
            </div>

            <div 
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <FaTheaterMasks className="h-4 w-4 mr-2" />
              <span className="text-sm">{t("header.help.Terms_of_use")}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Help;