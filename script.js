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
        <h2>两次康复 <br><small style="color:#86868b;font-size:0.6em;font-weight:300">Surgeries</small></h2>
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
                    <div class="bookshelf-case">
                        <div class="shelf-row">
                            <div class="thin-spine tone-1 h-95" onclick="showItemDetail('book-dt-xiangtu')">乡土中国</div>
                            <div class="thin-spine tone-2 h-90" onclick="showItemDetail('book-dt-suicide')">自杀论</div>
                            <div class="thin-spine tone-3 h-100">街角社会</div>
                            <div class="thin-spine tone-4 h-85">日常生活的自我呈现</div>
                            <div class="thin-spine tone-green h-90">新教伦理与资本主义</div>
                        </div>
                        <div class="shelf-row">
                             <div class="thin-spine tone-1 h-100">金翼</div>
                             <div class="thin-spine tone-2 h-85">江村经济</div>
                             <div class="thin-spine tone-3 h-90"特权></div>
                             <div class="thin-spine tone-4 h-95">我和我的二本学生</div>
                        </div>
                        <div class="shelf-row">
                            <div class="thin-spine tone-5 h-95">社会学的想象力</div>
                            <div class="thin-spine tone-5 h-85">见树又见林/</div>
                            <div class="thin-spine tone-red h-90">天真的人类学家</div>
                        </div>
                    </div>

                    <div id="book-dt-xiangtu" class="item-detail-view">
                        <div class="back-btn" onclick="closeItemDetail('soc-shelf-view')">← 回到书架</div>
                        <div class="detail-hero">
                            <div class="detail-cover">封面</div>
                            <div class="detail-main">
                                <h2>乡土中国</h2><p>费孝通 | 1947</p>
                                <span class="score-badge">豆瓣 9.1</span>
                                <span class="rating-tag"> 我的评分: ⭐⭐⭐⭐⭐</span>
                            <div class="detail-meta" style="margin-top:5px;">📅 阅读时间: 2020.12</div>    
                            </div>
                         </div>
                         <div class="detail-content">
                              <p><strong>核心观点：</strong>中国是一个差序格局的社会。</p>
                         </div>
                    </div>

                    <div id="book-dt-suicide" class="item-detail-view">
                         <div class="back-btn" onclick="closeItemDetail('soc-shelf-view')">← 返回书架</div>
                        <div class="detail-hero">
                             <div class="detail-cover">封面</div>
                             <div class="detail-main">
                                 <h2>自杀论</h2><p>涂尔干 | 社会学经典</p>
                                 <div class="rating-row">
                                     <span class="score-badge">豆瓣 9.1</span>
                                     <span class="rating-tag"> 我的评分: ⭐⭐⭐⭐⭐</span>
                            <div class="detail-meta" style="margin-top:5px;">📅 阅读时间: 2020.12</div>
                                 </div>
                             </div>
                         </div>
                         <div class="detail-content">
                              <p><strong>核心观点：</strong>自杀不仅仅是个人行为，它反映了社会整合度的强弱。</p>
                         </div>
                     </div> 
                </div>

                <div id="eco" class="lib-detail-list">
                    <div class="back-btn" onclick="hideLibDetail()">← 返回分类</div>
                    <h3>💰 经济学书架</h3>
                    <div class="bookshelf-case">
                        <div class="shelf-row">
                            <div class="thin-spine tone-1 h-95" onclick="showItemDetail('book-dt-bide')">彼得林奇</div>
                            <div class="thin-spine tone-2 h-90" onclick="showItemDetail('book-dt-suicide')">自杀论</div>
                            <div class="thin-spine tone-3 h-100">街角社会</div>
                            <div class="thin-spine tone-4 h-85">日常生活的自我呈现</div>
                            <div class="thin-spine tone-green h-90">新教伦理与资本主义</div>
                        </div>
                        <div class="shelf-row">
                             <div class="thin-spine tone-1 h-100">金翼</div>
                             <div class="thin-spine tone-2 h-85">江村经济</div>
                             <div class="thin-spine tone-3 h-90"特权></div>
                             <div class="thin-spine tone-4 h-95">我和我的二本学生</div>
                        </div>
                        <div class="shelf-row">
                            <div class="thin-spine tone-5 h-95">社会学的想象力</div>
                            <div class="thin-spine tone-5 h-85">见树又见林/</div>
                            <div class="thin-spine tone-red h-90">天真的人类学家</div>
                        </div>
                    </div>
                    
                    <div id="book-dt-bide" class="item-detail-view">
                        <div class="back-btn" onclick="closeItemDetail('eco-shelf-view')">← 回到书架</div>
                        <div class="detail-hero">
                            <div class="detail-cover">封面</div>
                            <div class="detail-main">
                                <h2>彼得林奇</h2><p>彼得林奇 | 1947</p>
                                <span class="score-badge">豆瓣 9.1</span>
                                <span class="rating-tag"> 我的评分: ⭐⭐⭐⭐⭐</span>
                            <div class="detail-meta" style="margin-top:5px;">📅 阅读时间: 2020.12</div>    
                            </div>
                         </div>
                         <div class="detail-content">
                              <p><strong>核心观点：</strong>中国是一个差序格局的社会。</p>
                         </div>
                    </div>

                    <div id="book-dt-suicide" class="item-detail-view">
                         <div class="back-btn" onclick="closeItemDetail('eco-shelf-view')">← 返回书架</div>
                        <div class="detail-hero">
                             <div class="detail-cover">封面</div>
                             <div class="detail-main">
                                 <h2>自杀论</h2><p>涂尔干 | 社会学经典</p>
                                 <div class="rating-row">
                                     <span class="score-badge">豆瓣 9.1</span>
                                     <span class="rating-tag"> 我的评分: ⭐⭐⭐⭐⭐</span>
                            <div class="detail-meta" style="margin-top:5px;">📅 阅读时间: 2020.12</div>
                                 </div>
                             </div>
                         </div>
                         <div class="detail-content">
                              <p><strong>核心观点：</strong>自杀不仅仅是个人行为，它反映了社会整合度的强弱。</p>
                         </div>
                     </div>
                </div>

            

                <div id="nov-shelf-view" class="lib-detail-list">
                    <div class="back-btn" onclick="hideLibDetail()">← 返回分类</div>
                    <h3>🖋 小说书架</h3>
                    <div class="bookshelf-case">
                        <div class="shelf-row">
                            <div class="thin-spine tone-red h-95">活着</div>
                            <div class="thin-spine tone-1 h-90">悉达多</div>
                        </div>
                         <div class="shelf-row"></div>
                         <div class="shelf-row"></div>
                    </div>
                </div>
                
                <div id="psy-shelf-view" class="lib-detail-list"><div class="back-btn" onclick="hideLibDetail()">← 返回</div><h3>心理学</h3><p>暂无</p></div>

            </div>
        </div>
    `,
 // --- 2. 观影记录 (胶卷风格 + 详情) ---
    'movies': `
        <div class="detail-header">
            <h2>观影记录 <br><small style="color:#86868b;font-size:0.6em;">Cinematheque</small></h2>
        </div>
        
        <div class="tab-container">
            <div class="tab-btn active" onclick="switchTab('mov-rank', this)">🎬 人生电影</div>
            <div class="tab-btn" onclick="switchTab('mov-lib', this)">💾 个人影库</div>
        </div>

        <div class="detail-content">
            <div id="mov-rank" class="tab-view">
                <ul class="ranking-list">
                    <li class="ranking-item"><span class="rank-badge rank-1">1</span><div class="book-info"><h4>哈尔的移动城堡</h4><div class="book-meta">[日] 宫崎骏</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-2">2</span><div class="book-info"><h4>面子</h4><div class="book-meta">[美] 伍思薇</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-3">3</span><div class="book-info"><h4>机器人之梦</h4><div class="book-meta">[西] 巴勃罗·贝格尔</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">4</span><div class="book-info"><h4>her</h4><div class="book-meta">[美] 斯派克·琼斯</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">5</span><div class="book-info"><h4>三傻大闹宝莱坞</h4><div class="book-meta">[印] 拉吉库马尔·希拉尼</div></div></li>
                </ul>
            </div>

            <div id="mov-lib" class="tab-view" style="display:none;">
                
                <h3 class="subsection-title">Animation / 动画</h3>
                <div class="film-container">
                    <div class="film-strip">
                        <div class="film-frame" onclick="showItemDetail('mov-dt-howl')"><div class="film-content">哈尔的<br>移动城堡</div></div>
                        <div class="film-frame" onclick="showItemDetail('mov-dt-robot')"><div class="film-content">机器人<br>之梦</div></div>
                        <div class="film-frame"><div class="film-content">千与千寻</div></div>
                        <div class="film-frame"><div class="film-content">悬崖上的<br>金鱼姬</div></div>
                    </div>
                </div>

                <h3 class="subsection-title">Sci-Fi & Drama / 科幻</h3>
                <div class="film-container">
                    <div class="film-strip">
                        <div class="film-frame"><div class="film-content">her</div></div>
                        <div class="film-frame"><div class="film-content">星际穿越</div></div>
                        <div class="film-frame"><div class="film-content">黄金罗盘</div></div>
                    </div>
                </div>

                <h3 class="subsection-title"> Scary / 悬疑</h3>
                <div class="film-container">
                    <div class="film-strip">
                        <div class="film-frame"><div class="film-content">her</div></div>
                        <div class="film-frame"><div class="film-content">穆赫兰道</div></div>
                        <div class="film-frame"><div class="film-content">搏击俱乐部</div></div>
                        <div class="film-frame"><div class="film-content">谍影重重</div></div>
                    </div>
                </div>

                <h3 class="subsection-title">love / 爱情</h3>
                <div class="film-container">
                    <div class="film-strip">
                        <div class="film-frame"><div class="film-content">面子</div></div>
                        <div class="film-frame"><div class="film-content">末路狂花</div></div>
                        <div class="film-frame"><div class="film-content"></div></div>
                        <div class="film-frame"><div class="film-content">穆赫兰道</div></div>
                    </div>
                </div>
                
                <div id="mov-dt-howl" class="item-detail-view" style="margin-top:20px;">
                    <div class="back-btn" onclick="closeItemDetail('mov-lib-root')">← 关闭详情</div>
                    <div class="detail-hero">
                        <div class="detail-cover">海报</div>
                        <div class="detail-main">
                            <h2>哈尔的移动城堡</h2>
                            <div class="detail-meta">宫崎骏 | 2004</div>
                            <div class="rating-box">
                                <span class="douban-rank">豆瓣 9.1</span>
                                <span class="my-score2">我的评分: ⭐⭐⭐⭐⭐</span>
                            </div>
                            <div class="detail-meta" style="margin-top:5px;">📅 观看时间: 2020.12</div>
                        </div>
                    </div>
                    <div class="quote-card">“世界这么大，人生这么长，总会有这么一个人，让你想要温柔的对待。”</div>
                </div>
                 <div id="mov-dt-robot" class="item-detail-view" style="margin-top:20px;">
                    <div class="back-btn" onclick="closeItemDetail('mov-lib-root')">← 关闭详情</div>
                     <h2>机器人之梦</h2><p>详情补充中...</p>
                </div>

            </div>
        </div>
    `,               
    

     
    // --- 我的修改版：音乐  ---
    'musics': `
        <div class="detail-header">
            <h2>音乐收藏 <br><small style="color:#86868b;font-size:0.6em;">Reading Space</small></h2>
        </div>
        
        <div class="tab-container">
            <div class="tab-btn active" onclick="switchTab('music-rank', this)">💿 最爱专辑</div>
            <div class="tab-btn" onclick="switchTab('music-lib', this)">🎵 个人曲库</div>
        </div>

        <div class="detail-content">
            <div id="music-rank" class="tab-view">
                <ul class="ranking-list">
                    <li class="ranking-item"><span class="rank-badge rank-1">1</span><div class="book-info"><h4>如也</h4><div class="book-meta"「民谣」 陈粒</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-2">2</span><div class="book-info"><h4>Reputation</h4><div class="book-meta">「流行」 Taylor Swift</div></div></li>
                    <li class="ranking-item"><span class="rank-badge rank-3">3</span><div class="book-info"><h4>this is what ___ feels like</h4><div class="book-meta">「流行」 Jvke</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">4</span><div class="book-info"><h4>?</h4><div class="book-meta">「嘻哈」 XXXTENTACION</div></div></li>
                    <li class="ranking-item"><span class="rank-badge">5</span><div class="book-info"><h4>浴室</h4><div class="book-meta">「摇滚」 deca joins</div></div></li>
                </ul>
            </div>
            <div id="music-lib" class="tab-view" style="display:none;">
                
                <div id="vinyl-view" class="vinyl-grid">
                    <div class="vinyl-record" onclick="showItemDetail('rap-list')">
                        <div class="vinyl-label label-rap">Hiphop<br>嘻哈</div>
                    </div>
                    <div class="vinyl-record" onclick="showItemDetail('folk-list')">
                        <div class="vinyl-label label-folk">Folk<br>民谣</div>
                    </div>
                    <div class="vinyl-record" onclick="showItemDetail('pop-list')">
                        <div class="vinyl-label label-pop">Pop<br>流行</div>
                    </div>
                     <div class="vinyl-record" onclick="showItemDetail('rock-list')">
                        <div class="vinyl-label label-rap">Hiphop<br>摇滚</div>
                    </div>
                    <div class="vinyl-record" onclick="showItemDetail('electric-list')">
                        <div class="vinyl-label label-folk">Folk<br>电子</div>
                    </div>
                </div>

                <div id="rap-list" class="lib-detail-list" style="display:none;">
                    <div class="back-btn" onclick="closeItemDetail('vinyl-view')">← 返回唱片架</div>
                    <h3>🎤 Hiphop Collection</h3>
                    <ul class="clean-list">
                        <li>🎵 Kanye West - Runaway</li>
                        <li>🎵 Capper - 雪 Distance</li>
                        <li>🎵 Travis Scott - FE!N</li>
                    </ul>
                </div>
                
                <div id="folk-list" class="lib-detail-list" style="display:none;">
                     <div class="back-btn" onclick="closeItemDetail('vinyl-view')">← 返回唱片架</div>
                     <h3>🎸 Folk Collection</h3>
                     <p>歌曲列表...</p>
                </div>
                 <div id="pop-list" class="lib-detail-list">
                     <div class="back-btn" onclick="closeItemDetail('vinyl-view')">← 返回唱片架</div>
                     <h3>✨ Pop Collection</h3>
                     <p>歌曲列表...</p>
                </div>

            </div>
        </div>
    `,
// --- 3. 健身 (地图足迹 + 习惯) ---
    'fitness': `
         <div class="detail-header">
            <h2>健身与足迹 <br><small style="color:#86868b;font-size:0.6em;">Body & Soul</small></h2>
        </div>
        
        <div class="tab-container">
            <div class="tab-btn active" onclick="switchTab('fit-map', this)">🗺️ 健身足迹</div>
            <div class="tab-btn" onclick="switchTab('fit-habit', this)">💪 健身习惯</div>
        </div>

        <div class="detail-content">
            <div id="fit-map" class="tab-view">
                <div class="map-wrapper">
                    <div class="china-outline"></div>
                    <div class="map-dot active" style="top: 80%; left: 65%;" onclick="alert('📍 广州：\nOneFit 健身工作室 (珠江新城店)\n打分：⭐⭐⭐⭐')"></div>
                    <div class="map-tooltip" style="top: 75%; left: 65%;">广州</div>
                    
                    <div class="map-dot active" style="top: 55%; left: 80%;" onclick="alert('📍 上海：\nPure Fitness (南京西路)\n打分：⭐⭐⭐⭐⭐')"></div>
                    
                    <div class="map-dot" style="top: 35%; left: 72%;"></div>
                </div>
                <p style="text-align:center; color:#86868b; font-size:0.8rem;">点击亮起的点查看健身房记录</p>
                
                <h3 class="subsection-title">打卡列表</h3>
                <ul class="clean-list">
                    <li><strong>OneFit 健身工作室</strong> <p>广州 · 珠江新城 | 2023.10 | 器械很全，氛围好</p></li>
                    <li><strong>Pure Fitness</strong> <p>上海 · 南京西路 | 2024.01 | 环境顶级，价格略贵</p></li>
                </ul>
            </div>

            <div id="fit-habit" class="tab-view" style="display:none;">
                <div class="score-grid">
                    <div class="score-card main-score">
                        <div class="score-label">每周频率</div>
                        <div class="score-num">4-5</div>
                        <div class="score-sub">Times / Week</div>
                    </div>
                    <div class="score-card">
                        <div class="score-label">偏好项目</div>
                        <div class="score-text">🏋️‍♀️ 自由力量 (深蹲/硬拉)<br>🏃‍♀️ 晨间空腹有氧<br>🧘‍♀️ 普拉提</div>
                    </div>
                </div>
                <h3 class="subsection-title">我的信条</h3>
                <div class="quote-card" style="border-left-color: #000;">
                    “保持强壮的身体，是支撑野心的基础。”
                </div>
            </div>
        </div>
    `,
};


// --- 逻辑控制函数 ---

// 1. 顶部 Tab 切换 (排行榜 vs 书库)
function switchTab(targetId, btn) {
    const parent = btn.parentElement.parentElement;
    const views = parent.querySelectorAll('.tab-view');
    const btns = parent.querySelectorAll('.tab-btn');
    
    views.forEach(v => v.style.display = 'none');
    btns.forEach(b => b.classList.remove('active'));
    
    parent.querySelector('#' + targetId).style.display = 'block';
    btn.classList.add('active');
}

// 2. 书库分类层级控制
// 点击六宫格 -> 进入具体分类 (如社会学书架)
function showLibDetail(shelfId) {
    // 隐藏六宫格
    const grid = document.getElementById('lib-grid-view');
    if(grid) grid.style.display = 'none';

    // 显示目标书架
    const target = document.getElementById(shelfId);
    if(target) target.style.display = 'block';
}

// 点击“返回分类” -> 回到六宫格
function hideLibDetail() {
    // 隐藏所有分类书架
    const lists = document.querySelectorAll('.lib-detail-list');
    lists.forEach(l => l.style.display = 'none');

    // 显示六宫格
    const grid = document.getElementById('lib-grid-view');
    if(grid) grid.style.display = 'grid';
}

// 3. 物品详情控制 (书籍/电影详情)
// 点击书脊/胶卷 -> 显示详情卡片
function showItemDetail(itemId) {
    // 1. 找到所有的详情页，先全部隐藏，防止重叠
    const allDetails = document.querySelectorAll('.item-detail-view');
    allDetails.forEach(d => d.style.display = 'none');

    // 2. 显示目标的详情页
    const target = document.getElementById(itemId);
    if(target) target.style.display = 'block';
}

// 点击详情页的“返回” -> 关闭详情，回到当前书架/列表
// parentViewId 是指你刚才所在的那个书架的 ID (例如 'soc-shelf-view')
function closeItemDetail(parentViewId) {
    // 隐藏所有详情页
    const allDetails = document.querySelectorAll('.item-detail-view');
    allDetails.forEach(d => d.style.display = 'none');

    // 如果是电影库，特殊处理：因为电影库没有六宫格，直接回列表
    if(parentViewId === 'mov-lib-root') {
        // 这里的逻辑是：只关闭详情，因为胶卷列表是一直显示在上面的 (Tab View里)
        // 实际上什么都不用做，或者你可以做滚动定位
        return; 
    }

    // 对于书籍，回到对应的分类书架
    const shelf = document.getElementById(parentViewId);
    if(shelf) shelf.style.display = 'block';
}

// 4. 基础弹窗打开/关闭 (保持不变)
function openDetail(id) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    
    // 获取数据，如果 key 对应的数据是 music 但用户传了 musics，做个兼容
    let content = data[id];
    if(!content && id === 'music') content = data['musics']; 

    modalBody.innerHTML = content || "<h2>内容完善中</h2>";
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