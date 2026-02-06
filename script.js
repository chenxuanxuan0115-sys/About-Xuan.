// --- 1. 自定义鼠标 (精致圆环) ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // 小点直接跟随
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // 圆环延迟跟随 (增加平滑感)
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// --- 2. 交互动效 (Hover 放大圆环) ---
const interactiveEls = document.querySelectorAll('a, .list-item, .card, .m-box, .fav-card, .close');
interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(2)'; // 放大
        outline.style.backgroundColor = 'rgba(0,0,0,0.03)'; // 微微变色
        outline.style.borderColor = 'transparent'; // 边框消失
    });
    el.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)'; // 复原
        outline.style.backgroundColor = 'transparent';
        outline.style.borderColor = 'rgba(0,0,0,0.2)';
    });
});

// --- 3. 滚动视差 (顶部名字位移差) ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const targets = document.querySelectorAll('.parallax-target');
    
    targets.forEach(el => {
        const speed = el.getAttribute('data-speed');
        // 核心：向下滚时，元素也向下微动，造成“它离背景更远”的视觉错觉
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// --- 4. 下拉淡入 (Scroll Reveal) ---
const observerOptions = {
    threshold: 0.15 // 元素出现 15% 时触发
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show');
        }
    });
}, observerOptions);

// 监听所有带 scroll-hidden 类的元素
document.querySelectorAll('.scroll-hidden').forEach(el => {
    observer.observe(el);
});

// --- 5. 详情弹窗数据中心 ---
// 在这里填入你的详细故事，支持 HTML 标签
const data = {
    'fudan': `
        <h2>复旦大学 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Fudan University</small></h2>
        <p>在社会政策专业的学习中，我致力于探索宏观政策对个体微观生活的影响...</p>
        <p>Looking at the impact of macro policies on individual lives...</p>
    `,
'gdufs': `
        <div class="detail-header">
            <h2>广东外语外贸大学 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Guangdong University of Foreign Studies</small></h2>
            <div class="tag-row" style="margin-top:10px;">
                <span class="detail-tag">2021 - 2025</span>
                <span class="detail-tag" style="background:#e3f2fd; color:#1976d2;">金融工程 (Fin-Eng)</span>
            </div>
        </div>

        <div class="detail-content">
            <h3 class="subsection-title">🎓 学术表现</h3>
            <div class="score-grid">
                <div class="score-card main-score" style="background: #2e7d32;"> <span class="score-label">学分绩点</span>
                    <span class="score-num">83/100</span>
                    <span class="score-sub">GPA Score</span>
                </div>
                <div class="score-card">
                    <span class="score-label">专业背景</span>
                    <div class="score-text">
                        <strong>金融工程专业</strong><br>
                        数理金融基础与风险管理
                    </div>
                </div>
            </div>

            <div class="two-col-layout">
                <div class="col-item">
                    <h3 class="subsection-title">🏃‍♀️ 竞技荣耀</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>院 400米 纪录保持者</strong>
                            <p>大一即打破学院纪录，展现爆发力</p>
                        </li>
                        <li>
                            <strong>校篮球赛冠军 (两连冠)</strong>
                            <p>大三、大四主力队员，担任得分后卫</p>
                        </li>
                        <li>
                            <strong>新生杯亚军</strong>
                            <p>入学即代表学院斩获荣誉</p>
                        </li>
                    </ul>
                </div>
                
                <div class="col-item">
                    <h3 class="subsection-title">✨ 校园影响力</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>校运会常客</strong>
                            <p>多次获得校级田径项目前八名</p>
                        </li>
                        <li>
                            <strong>多维发展</strong>
                            <p>在金融学术与体育竞技间取得完美平衡</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
// 确保上一段代码结束的地方有一个逗号 , 
    
'gzms': `
        <div class="detail-header">
            <h2>广州中学 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Guangzhou Middle School</small></h2>
            <div class="tag-row" style="margin-top:10px;">
                <span class="detail-tag">2018 - 2021</span>
                <span class="detail-tag" style="background:#e8f5e9; color:#008026;">物理 · 政治 · 生物</span>
            </div>
        </div>

        <div class="detail-content">
            <h3 class="subsection-title">🎓 学业表现</h3>
            <div class="score-grid">
                <div class="score-card main-score">
                    <span class="score-label">高考总分</span>
                    <span class="score-num">593</span>
                    <span class="score-sub">NCEE Score</span>
                </div>
                <div class="score-card">
                    <span class="score-label">单科高光</span>
                    <div class="score-text">
                        <strong>政治区状元</strong><br>
                        校排前三常客
                    </div>
                </div>
            </div>

            <div class="two-col-layout">
                <div class="col-item">
                    <h3 class="subsection-title">🏃‍♀️ 竞技荣耀</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>400米冠军 (3年蝉联)</strong>
                            <p>校运会统治级表现，个人PR 1'08</p>
                        </li>
                        <li>
                            <strong>区运会夺牌</strong>
                            <p>高一斩获一金一银，区级前五</p>
                        </li>
                        <li>
                            <strong>篮球校队主力</strong>
                            <p>连续两年天河区前八名</p>
                        </li>
                    </ul>
                </div>
                
                <div class="col-item">
                    <h3 class="subsection-title">✨ 校园活动</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>街舞社 (Hip-hop)</strong>
                            <p>每周三训，多次登台公演</p>
                        </li>
                        <li>
                            <strong>手抄报大赛一等奖</strong>
                            <p>统筹策划，带领班级团队夺冠</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    
   'mcd': `
        <div class="detail-header">
            <h2>疯狂早八 · 麦当劳创业 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Crazy 8 AM: Campus Delivery Startup</small></h2>
            <div class="tag-row" style="margin-top:10px;">
                <span class="detail-tag">2023 创业实践</span>
                <span class="detail-tag" style="background:#fff3e0; color:#ef6c00;">0 到 1 盈利实现</span>
            </div>
        </div>

        <div class="detail-content">
            <h3 class="subsection-title">📊 运营数据</h3>
            <div class="score-grid">
                <div class="score-card main-score" style="background: #ffc107; color: #000;">
                    <span class="score-label" style="color: rgba(0,0,0,0.6);">月实现盈利</span>
                    <span class="score-num" style="color: #000;">¥2000+</span>
                    <span class="score-sub" style="color: rgba(0,0,0,0.5);">Monthly Profit</span>
                </div>
                <div class="score-card">
                    <span class="score-label">运营效率</span>
                    <div class="score-text">
                        <strong>日盈利100+</strong><br>
                        单量 30-40 份 / 晨
                    </div>
                </div>
            </div>

            <div class="two-col-layout">
                <div class="col-item">
                    <h3 class="subsection-title">💡 商业洞察与落地</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>偶然灵感 × 需求空缺</strong>
                            <p>早起发现校内无早餐，根据周边1km有麦当劳的地理优势，以及网上优惠券的下单可盈利空间，结合学生“早八”痛点。</p>
                        </li>
                        <li>
                            <strong>极简营销 × 用户增长</strong>
                            <p>手绘海报扫楼，精准触达。私域流量从 0 快速裂变为 3 个满员社群。</p>
                        </li>
                        <li>
                            <strong>数字化订单管理</strong>
                            <p>熟练运用 <strong>Excel</strong> 建立标准化处理流程，实现 20-30 份复杂订单的零误差统计、定价与结算。</p>
                        </li>
                    </ul>
                </div>
                
                <div class="col-item">
                    <h3 class="subsection-title">⚙️ 运营交付与协调</h3>
                    <ul class="clean-list">
                        <li>
                            <strong>精准物流控制</strong>
                            <p>电动车 + 泡沫保温箱，1公里接力。7:40 准时送达，精准覆盖 8:30 课程客群。</p>
                        </li>
                        <li>
                            <strong>供应链协调能力</strong>
                            <p>与麦当劳门店深度协调备货节奏，确保高频大单的即时交付。</p>
                        </li>
                        <li>
                            <strong>规模化与竞争管理</strong>
                            <p>由于市场火爆引发大量抄袭，后通过招募兼职、优化SOP，成功实现管理转型。</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    
    'sports': `
        <h2>体育竞技 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Athletics</small></h2>
        <p>八年磨一剑。连续三年的400米冠军教会我:痛苦是成长的必经之路。</p>
    `,
    'surgery': `
        <h2>两次手术 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Surgeries</small></h2>
        <p>这是我人生的暂停键。在无法奔跑的日子里，我学会了向内探索。</p>
    `,
    'books': `
        <h2>我的书单 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Book List</small></h2>
        <ul>
            <li>《悉达多》- 赫尔曼·黑塞</li>
            <li>《社会政策导论》</li>
            <li>《置身事内》</li>
        </ul>
    `
    // 你可以继续添加其他 ID...
};

// 弹窗逻辑
function openDetail(id) {
    const modal = document.getElementById('modal');
    const content = data[id] || "<h2>内容完善中</h2><p>Coming Soon...</p>";
    document.getElementById('modal-body').innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// 点击背景关闭弹窗
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}