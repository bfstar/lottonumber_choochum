document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('.reveal');
    const reportForm = document.querySelector('[data-report-form]');
    const reportStatus = reportForm ? reportForm.querySelector('.form-status') : null;

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((item) => item.classList.add('is-visible'));
        setupReportForm();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealTargets.forEach((item) => observer.observe(item));
    setupReportForm();

    function setupReportForm() {
        if (!reportForm) return;

        reportForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (reportStatus) reportStatus.textContent = '신고를 전송 중입니다...';

            try {
                const response = await fetch(reportForm.action, {
                    method: 'POST',
                    body: new FormData(reportForm),
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    reportForm.reset();
                    if (reportStatus) {
                        reportStatus.textContent = '신고가 접수되었습니다. 감사합니다.';
                    }
                    return;
                }

                if (reportStatus) {
                    reportStatus.textContent = '접수에 실패했습니다. 잠시 후 다시 시도해주세요.';
                }
            } catch (error) {
                if (reportStatus) {
                    reportStatus.textContent = '네트워크 오류가 발생했습니다.';
                }
            }
        });
    }
});
