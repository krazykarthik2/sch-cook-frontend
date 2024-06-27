import React from "react";

function AlertIcon({icon,color, content }) {
  return (
    <div className="d-center ">
      <div class="inline-flex overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class={`flex items-center justify-center w-12 bg-${color}-500 text-white`}>
          {icon}
        </div> 

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <div class={`d-center text-sm text-${color}-500 dark:text-${color}-400`}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertIcon;
