import { useRef } from "react";
import { menu, create } from "../../data/allMenu";
import useClickOutside from "../../helpers/clickOutside";
import AllMenuItem from "./AllMenuItem";
export default function AllMenu({ notifications }) {
  return (
    <div className="all_menu">
      {/* <div className="all_menu_header">Menu</div> */}
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          {/* <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div> */}
          <div className="all_menu_group">
            <div className="all_menu_group_header">Notifications</div>
            {notifications.slice(0, 6).map((item, i) => (
              <AllMenuItem
                name={item.type}
                description={item.description}
                icon={item.icon}
                key={i}
                event={item.event}
                notificationId={item._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
