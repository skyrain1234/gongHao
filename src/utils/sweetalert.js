import swal from "sweetalert2";

// 自訂
export const customAlert = (title, message = "", icon = "") => {
	swal.fire({
		icon: icon,
		title: title,
		html: message,
	});
};

// 成功
export const successAlert = (title, message = "") => {
	swal.fire({
		icon: "success",
		title: title,
		html: message,
	});
};

// 錯誤
export const errorAlert = (title, message = "") => {
	swal.fire({
		icon: "error",
		title: title,
		html: message,
	});
};

// 載入動畫
export const loadingAlert = (title = "") => {
	swal.fire({
		title: title,
		showConfirmButton: false,
		html: `
    <div class="loader-container"><div class="loader"></div></div>
    <style lang="scss" scoped>
    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height:100px;
      .loader {
        width: 60px;
        height: 60px;
        padding: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #000000;
        --_m: 
          conic-gradient(#0000 10%,#000),
          linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
                mask: var(--_m);
        -webkit-mask-composite: source-out;
                mask-composite: subtract;
        animation: l3 1s infinite linear;
      }
    }
    
    @keyframes l3 {to{transform: rotate(1turn)}}
    </style>
    `,
	});
};

// 關閉
export const closeAlert = () => {
	swal.close();
};
