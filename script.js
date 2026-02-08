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
        <p>即将入读......</p>
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
                    <span class="score-num">83</span>
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
                            <strong>区手抄报大赛一等奖</strong>
                            <p>统筹策划，组建团队，脱颖而出</p>
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
                    <span class="score-label" style="color: rgba(0,0,0,0.6);">单兵作战-实现月盈利</span>
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
                            <p>与麦当劳门店相互配合协调备货节奏，确保高频大单的即时交付。</p>
                        </li>
                        <li>
                            <strong>规模化与竞争管理</strong>
                            <p>开拓校园配新赛道后来模仿者层出不穷，因兼有其他实习招募兼职、优化SOP，成功实现管理转型。</p>
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
        <div class="detail-header">
            <h2>阅读世界 <br><small style="color:#86868b;font-size:0.6em;">Reading Space</small></h2>
        </div>
        
        <div class="tab-container">
            <div class="tab-btn active" onclick="switchTab('book-rank', this)">🏆 荒岛书单</div>
            <div class="tab-btn" onclick="switchTab('book-lib', this)">📚 个人书库</div>
        </div>

        <div class="detail-content">
            <div id="book-rank" class="tab-view">
                <ul class="ranking-list">
                    <li class="ranking-item"><span class="rank-badge rank-1">1</span><div class="book-info"><h4>献给阿尔吉侬的花束</h4><div class="book-meta">[美] 丹尼尔·凯斯</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-2">2</span><div class="book-info"><h4>社会学入门</h4><div class="book-meta">[美] 詹姆斯·汉斯林</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-3">3</span><div class="book-info"><h4>撒哈拉的故事</h4><div class="book-meta">[中] 三毛</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">4</span><div class="book-info"><h4>纳瓦尔宝典</h4><div class="book-meta">[美] 埃里克·乔根森</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">5</span><div class="book-info"><h4>1984</h4><div class="book-meta">[英] 乔治·奥威尔</div></div></li>
                </ul>
            </div>

            <div id="book-lib" class="tab-view" style="display:none;">
                <div id="lib-grid-view" class="lib-grid">
                    <div class="lib-box bg-soc" onclick="showLibDetail('soc')">社会学<br><small>Sociology</small></div>
                    <div class="lib-box bg-eco" onclick="showLibDetail('eco')">经济学<br><small>Economics</small></div>
                    <div class="lib-box bg-psy" onclick="showLibDetail('psy')">心理学<br><small>Psychology</small></div>
                    <div class="lib-box bg-nov" onclick="showLibDetail('nov')">小说<br><small>Fiction</small></div>
                    <div class="lib-box bg-bio" onclick="showLibDetail('bio')">传记<br><small>Biography</small></div>
                    <div class="lib-box bg-hlt" onclick="showLibDetail('hlt')">健康<br><small>Health</small></div>
                </div>

                <div id="soc" class="lib-detail-list">
                    <div class="back-btn" onclick="hideLibDetail()">← 返回分类</div>
                    <h3>🏛 社会学书架</h3>
                    <div class="book-tags"><span class="book-tag">乡土中国</span><span class="book-tag">自杀论</span></div>
                </div>
                <div id="eco" class="lib-detail-list">
                    <div class="back-btn" onclick="hideLibDetail()">← 返回分类</div>
                    <h3>💰 经济学书架</h3>
                    <div class="book-tags"><span class="book-tag">置身事内</span><span class="book-tag">小岛经济学</span></div>
                </div>
                <div id="nov" class="lib-detail-list">
                    <div class="back-btn" onclick="hideLibDetail()">← 返回分类</div>
                    <h3>🖋 小说书架</h3>
                    <div class="book-tags"><span class="book-tag">活着</span><span class="book-tag">悉达多</span></div>
                </div>
                 <div id="psy" class="lib-detail-list"><div class="back-btn" onclick="hideLibDetail()">← 返回分类</div><h3>🧠 心理学</h3><p>暂无记录</p></div>
                 <div id="bio" class="lib-detail-list"><div class="back-btn" onclick="hideLibDetail()">← 返回分类</div><h3>📜 传记</h3><p>暂无记录</p></div>
                 <div id="hlt" class="lib-detail-list"><div class="back-btn" onclick="hideLibDetail()">← 返回分类</div><h3>❤️ 健康</h3><p>暂无记录</p></div>
            </div>
        </div>
    `,

    // --- 新：观影 (双模态) ---
    'movies': `
        <div class="detail-header">
            <h2>观影记录 <br><small style="color:#86868b;font-size:0.6em;">Cinematheque</small></h2>
        </div>
        
        <div class="tab-container">
            <div class="tab-btn active" onclick="switchTab('mov-rank', this)">🎬 Top 3</div>
            <div class="tab-btn" onclick="switchTab('mov-lib', this)">💾 个人影库</div>
        </div>

        <div class="detail-content">
            <div id="mov-rank" class="tab-view">
                 <ul class="ranking-list">
                    <li class="ranking-item"><span class="rank-badge rank-1">1</span><h4>哈尔的移动城堡</h4></li>
                    <li class="ranking-item"><span class="rank-badge rank-2">2</span><h4>面子 (Saving Face)</h4></li>
                    <li class="ranking-item"><span class="rank-badge rank-3">3</span><h4>机器人之梦</h4></li>
                </ul>
            </div>

            <div id="mov-lib" class="tab-view" style="display:none;">
                <div id="mov-grid-view" class="lib-grid">
                    <div class="lib-box bg-mov1" onclick="showMovDetail('ani')">动画电影<br><small>Animation</small></div>
                    <div class="lib-box bg-mov2" onclick="showMovDetail('sci')">科幻电影<br><small>Sci-Fi</small></div>
                    <div class="lib-box bg-mov3" onclick="showMovDetail('sus')">悬疑电影<br><small>Suspense</small></div>
                    <div class="lib-box bg-mov4" onclick="showMovDetail('dra')">剧情电影<br><small>Drama</small></div>
                </div>

                <div id="ani" class="lib-detail-list">
                    <div class="back-btn" onclick="hideMovDetail()">← 返回影库</div>
                    <h3>动画电影</h3>
                    <div class="book-tags"><span class="book-tag">哈尔的移动城堡</span><span class="book-tag">机器人之梦</span><span class="book-tag">悬崖上的金鱼姬</span><span class="book-tag">千与千寻</span></div>
                </div>
                <div id="sci" class="lib-detail-list">
                    <div class="back-btn" onclick="hideMovDetail()">← 返回影库</div>
                    <h3>科幻电影</h3>
                    <div class="book-tags"><span class="book-tag">Her</span><span class="book-tag">星际穿越</span><span class="book-tag">黄金罗盘</span></div>
                </div>
                <div id="sus" class="lib-detail-list">
                    <div class="back-btn" onclick="hideMovDetail()">← 返回影库</div>
                    <h3>悬疑电影</h3>
                    <div class="book-tags"><span class="book-tag">穆赫兰道</span><span class="book-tag">搏击俱乐部</span></div>
                </div>
                <div id="dra" class="lib-detail-list">
                    <div class="back-btn" onclick="hideMovDetail()">← 返回影库</div>
                    <h3>剧情电影</h3>
                    <div class="book-tags"><span class="book-tag">面子</span><span class="book-tag">猫鼠游戏</span><span class="book-tag">末路狂花</span></div>
                </div>
            </div>
        </div>
    `,

    // --- 新：音乐 (简洁列表) ---
    'music': `
        <div class="detail-header">
            <h2>音乐收藏 <br><small style="color:#86868b;font-size:0.6em;">Music Taste</small></h2>
        </div>
        <div class="detail-content music-group">
            <h4> 喜爱的歌手</h4>
            <div class="singer-tags">
                <span>Capper <small>(Rapper)</small></span>
                <span>Taylor Swift <small>(Pop)</small></span>
                <span>陈粒 <small>(Folk)</small></span>
            </div>

            <h4>循环单曲</h4>
            <ul class="clean-list song-list">
                <li>仲夏夜的梦</li>
                <li>Call it what you want</li>
                <li>绝对占有相对自由</li>
            </ul>
        </div>
    `,

    'fitness': `<h2>健身习惯</h2><p>保持强壮的身体，是支撑野心的基础。</p>`
};

function openDetail(id) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) {
        console.error("找不到弹窗元素！请检查 HTML 中是否有 id='modal' 和 id='modal-body'");
        return;
    }

    const content = data[id] || "<h2>内容完善中</h2><p>Coming Soon...</p>";
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

// 点击背景关闭
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// 1. 切换 Tab (排行榜 vs 书库)
function switchTab(targetId, btn) {
    // 找到当前弹窗内的所有 View 和 Btn
    const parent = btn.parentElement.parentElement;
    const views = parent.querySelectorAll('.tab-view');
    const btns = parent.querySelectorAll('.tab-btn');

    // 隐藏所有视图，取消所有按钮激活状态
    views.forEach(v => v.style.display = 'none');
    btns.forEach(b => b.classList.remove('active'));

    // 显示目标视图，激活点击的按钮
    parent.querySelector('#' + targetId).style.display = 'block';
    btn.classList.add('active');
}

// 2. 书籍：显示分类详情
function showLibDetail(catId) {
    document.getElementById('lib-grid-view').style.display = 'none'; // 隐藏九宫格
    document.getElementById(catId).style.display = 'block'; // 显示对应列表
}

// 3. 书籍：返回九宫格
function hideLibDetail() {
    const lists = document.querySelectorAll('.lib-detail-list');
    lists.forEach(l => l.style.display = 'none'); // 隐藏所有列表
    document.getElementById('lib-grid-view').style.display = 'grid'; // 显示九宫格
}

// 4. 电影：显示分类详情 (逻辑同上)
function showMovDetail(catId) {
    document.getElementById('mov-grid-view').style.display = 'none';
    document.getElementById(catId).style.display = 'block';
}

// 5. 电影：返回九宫格
function hideMovDetail() {
    const lists = document.querySelectorAll('.lib-detail-list');
    lists.forEach(l => l.style.display = 'none');
    document.getElementById('mov-grid-view').style.display = 'grid';
}

// --- 保持原有的 openDetail, closeModal, window.onclick 不变 ---
function openDetail(id) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    const content = data[id] || "<h2>内容完善中</h2><p>Coming Soon...</p>";
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) closeModal();
}