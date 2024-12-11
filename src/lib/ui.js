import $ from "jquery";

export const modalUI = {
	// 모달창 오픈
	open(target) {
		$(target).removeClass("delay").show().addClass("active");
	},
	// 모달창 닫기
	close(target) {
		if (!$(target).hasClass("active")) $(target).hide();
		else {
			$(target).removeClass("active").addClass("delay");
			setTimeout(() => {
				$(target).hide();
			}, 300);
		}
	},
};
