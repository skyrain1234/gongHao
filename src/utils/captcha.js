/**
 * 產生圖形驗證碼
 * @param {HTMLCanvasElement} canvas - canvas 元素
 * @param {number} length - 驗證碼長度（預設 5）
 * @returns {string} 產生的驗證碼字串
 */
export function generateCaptcha(canvas, length = 5) {
	if (!canvas) return "";
	// const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	const chars = "123456789"; // 可自訂
	let code = "";

	for (let i = 0; i < length; i++) {
		code += chars[Math.floor(Math.random() * chars.length)];
	}

	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 背景
	ctx.fillStyle = "#f8f8f8";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 雜訊
	for (let i = 0; i < 30; i++) {
		ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
			Math.random() * 255
		})`;
		ctx.fillRect(
			Math.random() * canvas.width,
			Math.random() * canvas.height,
			2,
			2
		);
	}

	// 驗證碼文字
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";

	for (let i = 0; i < code.length; i++) {
		ctx.save();
		ctx.translate(20 + i * 22, 20);
		ctx.rotate((Math.random() - 0.5) * 0.5);
		ctx.fillText(code[i], 0, 0);
		ctx.restore();
	}

	return code;
}
