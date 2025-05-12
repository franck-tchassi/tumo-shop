import { useI18n } from '@/locales/client';
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/actions/auth';
import { MdEventNote } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const AccountInfo = ({ user }: { user: { email: string } }) => {
  const t = useI18n();
  const router = useRouter();

  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 rounded-md hover:bg-gray-100 px-3 py-2 cursor-pointer transition-colors">
          <FaRegUser className="h-5 w-5" />
          <span className="text-sm  text-gray-500  truncate max-w-[100px]">
            {/* {user.email.substring(0, user.email.indexOf('@'))} */}
            Hi, {user.email.substring(0, 6)}...
          </span>
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
        
        <div className="space-y-2 relative z-20 bg-white">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <FaRegUser className="h-4 w-4 mr-2" />
              <span className="text-sm">Your profile</span>
            </div>

            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <MdOutlineReviews className="h-4 w-4 mr-2" />
              <span className="text-sm">Your reviews</span>
            </div>

            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <MdEventNote className="h-4 w-4 mr-2" />
              <span className="text-sm">Your orders</span>
            </div>

            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <FaMapMarkerAlt className="h-4 w-4 mr-2" />
              <span className="text-sm">Address</span>
            </div>
            
            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <IoSettingsOutline className="h-4 w-4 mr-2" />
              <span className="text-sm">Settings</span>
            </div>

            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
              <IoIosNotificationsOutline className="h-4 w-4 mr-2" />
              <span className="text-sm">Notification</span>
            </div>

            <div className="border-t border-gray-100 my-1"></div>

            <div 
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 "
              onClick={async () => {
                await logoutUser();
                router.refresh();
              }}
            >
              <FaSignOutAlt className="h-4 w-4 mr-2" />
              <span className="text-sm">Sign out</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AccountInfo;