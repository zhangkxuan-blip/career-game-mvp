const interests = {
  R: { name: "现实型", full: "Realistic", desc: "被工具、设备、实体系统和具体操作吸引。" },
  I: { name: "研究型", full: "Investigative", desc: "被复杂问题、线索、规律和分析吸引。" },
  A: { name: "艺术型", full: "Artistic", desc: "被创造、表达、审美和非标准答案吸引。" },
  S: { name: "社会型", full: "Social", desc: "被帮助、教学、支持和人的成长吸引。" },
  E: { name: "企业型", full: "Enterprising", desc: "被影响、说服、领导和推动结果吸引。" },
  C: { name: "事务型", full: "Conventional", desc: "被流程、分类、规则、准确性和稳定执行吸引。" }
};

const styles = {
  achievement: "成就取向",
  initiative: "主动性",
  leadership: "领导/主导倾向",
  cooperation: "合作倾向",
  empathy: "共情倾向",
  detail: "细节注意",
  dependability: "可靠尽责",
  innovation: "创新倾向",
  analytical: "分析思维",
  stress: "压力耐受"
};

const contextAxes = {
  autonomy: ["高指导", "高自主"],
  change: ["高稳定", "高变化"],
  interaction: ["深度独处", "高互动"],
  competition: ["低竞争", "高竞争"],
  pressure: ["低冲突/低压力", "高冲突/高压力"],
  exploration: ["强规则流程", "开放探索"]
};

const stages = [
  {
    name: "第一阶段",
    title: "你会被什么吸引",
    range: [0, 6],
    kind: "interest",
    mapTitle: "阶段兴趣地图",
    summary: "先看你在模糊场景里自然靠近什么。这个阶段只给一个轻量画像，不急着下结论。"
  },
  {
    name: "第二阶段",
    title: "你会怎样行动",
    range: [6, 14],
    kind: "style",
    mapTitle: "阶段工作风格",
    summary: "这一阶段关注你在任务、压力、协作和不确定中更自然的反应。"
  },
  {
    name: "第三阶段",
    title: "什么环境更适合你",
    range: [14, 18],
    kind: "context",
    mapTitle: "阶段环境偏好",
    summary: "最后看你更容易在哪类工作节奏和组织环境中保持投入。"
  }
];

const archetypes = {
  IA: ["深层探索者", "你的选择显示，你当前更容易被复杂问题、隐藏规律和创造性表达吸引。相比单纯执行任务，你更需要理解事情背后的结构，并用自己的方式表达或重构它。"],
  IE: ["问题推动者", "你的选择显示，你不只想理解问题，也希望把判断转化成行动和影响。你更容易在复杂目标、模糊局面和需要推动的任务里被激活。"],
  CI: ["结构分析者", "你的选择显示，你更容易在清晰结构、准确判断和可验证结果中建立安全感。你适合把复杂信息整理成可靠系统。"],
  ES: ["影响连接者", "你的选择显示，你会被人与人之间的协作、资源连接和结果推进吸引。你不只是喜欢社交，更关心关系如何产生行动。"],
  AE: ["表达推动者", "你的选择显示，你需要通过表达、创意和影响力让想法进入现实。你更适合有呈现空间和外部反馈的环境。"],
  SC: ["稳定支持者", "你的选择显示，你更容易从支持他人、稳定协作和可靠交付中获得意义。你适合低敌意、有秩序、重视信任的团队。"]
};

const fallbackArchetype = ["混合探索者", "你的选择显示出多种兴趣并存。与其把自己固定成一个标签，不如观察哪些场景会让你自然靠近，哪些环境会让你快速消耗。"];

const questions = [
  {
    chapter: "场景片段",
    title: "陌生建筑",
    text: "深夜，你替朋友去一栋老楼取东西。电梯停在错误楼层，走廊尽头有几扇门亮着灯。你原本只想快点离开，但其中一扇门让你忍不住停下。",
    options: [
      { text: "一位老师傅把零件铺满地面，低声说“差一点就能重新转起来”。", scores: { R: 3 } },
      { text: "几个人围着白板沉默，白板上只有箭头、日期和一个被圈住的问号。", scores: { I: 3 } },
      { text: "有人对着空椅子排练，灯光、音乐和台词都像在等一个看不见的观众。", scores: { A: 3 } },
      { text: "一个人坐在地上发抖，旁边的人没有劝，只是陪他慢慢把话说完。", scores: { S: 3 } },
      { text: "几个人压低声音争执，桌上摊着预算、名单和一份还没签字的协议。", scores: { E: 3 } },
      { text: "一排旧柜子被打开，地上有很多标签，有人正把散落的东西放回顺序。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "陌生城市",
    text: "你在一座陌生城市醒来，手机没电，口袋里只有一张手绘地图。地图上被人用红笔圈了几个地方，你只能先去一个。",
    options: [
      { text: "去港口。那里有吊臂、集装箱和城市运转的声音。", scores: { R: 3 } },
      { text: "去图书馆。旧地图可能藏着这些红圈的来历。", scores: { I: 3 } },
      { text: "去剧院。门口贴着一张没有标题的海报。", scores: { A: 3 } },
      { text: "去学校。操场上有人聚在一起，像在等一个迟到的人。", scores: { S: 3 } },
      { text: "去市集。人流、价格和传闻在那里交汇。", scores: { E: 3 } },
      { text: "去档案馆。红圈旁边有一串很小的编号。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "废弃工厂",
    text: "你在一座停用的工厂里避雨。天快黑了，保安说你只能从桌上带走一样东西作为线索。",
    options: [
      { text: "一套沉甸甸的旧工具，其中一把还带着新磨过的痕迹。", scores: { R: 3 } },
      { text: "一本实验笔记，最后一页写着“变量还少一个”。", scores: { I: 3 } },
      { text: "一卷没有署名的胶片，封面只画了一只被划掉的眼睛。", scores: { A: 3 } },
      { text: "一封未寄出的信，开头是“我不知道你那天为什么没来”。", scores: { S: 3 } },
      { text: "一张旧路线图，几条线在同一个仓库前停住。", scores: { E: 3 } },
      { text: "一盒编号完整的钥匙，17 号钥匙被人单独包了起来。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "临时任务",
    text: "暴雨让一个小型活动临时改到室内。现场有点乱，负责人看向你：“你先帮我顶一块。”你最自然会走向哪里？",
    options: [
      { text: "去调试投影、桌椅和线路，让现场先能运转。", scores: { R: 3 } },
      { text: "回到刚才中断的环节，看看问题从哪里开始。", scores: { I: 3 } },
      { text: "调整入口、灯光和开场顺序，让来的人更快进入状态。", scores: { A: 3 } },
      { text: "去门口接住等待的人，告诉他们现场正在如何安排。", scores: { S: 3 } },
      { text: "找到几位关键人，把可选方案放到桌面上。", scores: { E: 3 } },
      { text: "把物料、人员和时间点列在一张纸上。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "无声房间",
    text: "你进入一个无声房间，桌上每样东西都只完成了一半。房门会在十分钟后锁上，你只能继续其中一样。",
    options: [
      { text: "一台被拆开的装置，旁边的人只留下“它本来会动”。", scores: { R: 3 } },
      { text: "一张没有结论的图表，几组数字落在同一个位置附近。", scores: { I: 3 } },
      { text: "一个只有开头的故事，第一句让你想知道后面会发生什么。", scores: { A: 3 } },
      { text: "一段访谈记录，受访者连续三次绕开了同一个话题。", scores: { S: 3 } },
      { text: "一页谈判记录，最后一行写着“对方在等另一个条件”。", scores: { E: 3 } },
      { text: "一堆票据和编号，少掉的那一张刚好在中间。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "第二天",
    text: "你花了很久做出一个东西，展示那天大家反应很冷。晚上回家后，你脑子里一直回放那个场面。第二天你更可能做什么？",
    options: [
      { text: "把所有反馈摊开，看哪些地方没有连起来。", scores: { I: 3 } },
      { text: "重做开头和呈现方式，让别人从另一个入口进入。", scores: { A: 3 } },
      { text: "约一个你信任的人喝咖啡，听他讲观看时的感受。", scores: { S: 3 } },
      { text: "再约一小批人看一次，边展示边观察他们的反应。", scores: { E: 3 } },
      { text: "把制作过程拆成步骤，看每一段是否都交代完整。", scores: { C: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "会议停住了",
    text: "会议已经拖了四十分钟。桌上的咖啡凉了，大家开始重复刚才说过的话。你心里第一个冒出来的念头是：",
    options: [
      { text: "再这样聊下去也没用，得有人把下一步先定下来。", scores: { leadership: 3 } },
      { text: "大家其实在讨论不同问题，先把问题写成一句话。", scores: { analytical: 3 } },
      { text: "已经有人不想说真话了，气氛比议题本身更麻烦。", scores: { empathy: 3 } },
      { text: "需要把刚才说过的决定和时间点写下来。", scores: { dependability: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "期限临近",
    text: "晚上 11 点，项目明天早上交付。你准备关电脑时，发现一个小错误：大多数人可能看不出来，但你知道它在那里。",
    options: [
      { text: "重新打开文件。既然看见了，就很难假装它不存在。", scores: { detail: 3 } },
      { text: "先看它会不会影响交付，只处理更可能出事的部分。", scores: { analytical: 3 } },
      { text: "把截图发到群里，说明情况，让团队一起决定值不值得改。", scores: { cooperation: 3 } },
      { text: "把它记进下一轮清单，先保住明早的交付节奏。", scores: { stress: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "没人安排",
    text: "你在群聊里看到一个小机会：客户随口提了一个需求，没人接话。它不在你的任务单上，但你觉得它可能有价值。",
    options: [
      { text: "自己先做个很粗的小样，明天拿给相关人看一眼。", scores: { initiative: 3, innovation: 2 } },
      { text: "先问一下这块现在由谁接，避免和已有安排打架。", scores: { dependability: 3 } },
      { text: "私下找熟悉客户的人聊十分钟，听听这个需求的背景。", scores: { analytical: 3 } },
      { text: "先放着。如果它持续出现，迟早会有人把它变成正式需求。", scores: { stress: -1, initiative: -1 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "方案被否定",
    text: "你刚讲完方案，对面的人直接说：“这个不行。”语气比你预想得重，房间里安静了两秒。你更可能：",
    options: [
      { text: "压住情绪，问：“你觉得卡住的是哪一部分？”", scores: { analytical: 3 } },
      { text: "先接一句：“我明白你有顾虑，我们把分歧摊开看一下。”", scores: { empathy: 3 } },
      { text: "不在现场争，回去做一个差异更大的版本再拿出来。", scores: { innovation: 3 } },
      { text: "如果你仍觉得方向对，就继续把关键理由讲完。", scores: { leadership: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "团队低落",
    text: "团队连续两次没达成目标。周五下午，办公室很安静，没人主动说话。你更自然会做哪件事？",
    options: [
      { text: "拉出数据和过程，看看问题更早是从哪一步开始的。", scores: { analytical: 3 } },
      { text: "约几个人出去走走，先让大家把憋着的话说出来。", scores: { empathy: 3 } },
      { text: "提出一个下周就能完成的小目标，让团队先有一次推进感。", scores: { achievement: 3 } },
      { text: "把接下来的任务重新拆开，分到具体时间段里。", scores: { dependability: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "重复任务",
    text: "你临时接手一批资料，内容不难，但数量很多，而且错一个编号后面都会乱。你更可能怎么处理？",
    options: [
      { text: "先做一张检查表，每完成一批就反查一次。", scores: { detail: 3 } },
      { text: "先花点时间找规律，看能不能用工具减少重复。", scores: { innovation: 3 } },
      { text: "先完成一批可交付的部分，再决定后面怎么安排。", scores: { achievement: 3 } },
      { text: "做过一段后切到另一类任务，再回来时更容易保持注意力。", scores: { stress: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "模糊目标",
    text: "负责人把旧版本发给你，只说：“下周给我一个更好的。”你问“好在哪里”，对方说：“你先想想。”",
    options: [
      { text: "把“更好”拆成几种可能，再拿去和对方对一下。", scores: { analytical: 3 } },
      { text: "先做一个很粗的版本，让大家对着具体东西讨论。", scores: { initiative: 3 } },
      { text: "去问几个会用到它的人，看他们卡在哪里。", scores: { empathy: 2, cooperation: 1 } },
      { text: "提出一个方向：“我先按这个目标推进，可以吗？”", scores: { leadership: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "公开比较",
    text: "下个月开始，团队每周一会把每个人的结果贴在白板上。第一次看到白板时，你更接近哪种反应？",
    options: [
      { text: "会忍不住看自己和前面的人差多少。", scores: { achievement: 3 } },
      { text: "会先看这些数字分别代表什么。", scores: { analytical: 3 } },
      { text: "会留意大家之后还愿不愿意互相帮忙。", scores: { cooperation: 3 } },
      { text: "会把它当成每周的节奏提醒。", scores: { stress: 3 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "两个工作日",
    text: "你可以提前看见接下来一个月的日程。两个版本都会占用很多精力，但你只能选一个。",
    options: [
      { text: "每天早上会拿到当天安排，下午同步进展，任务范围通常比较稳定。", scores: { change: -2, exploration: -2 } },
      { text: "每天都会出现新信息，上午形成的想法，下午可能换个角度继续试。", scores: { change: 2, exploration: 2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "两位负责人",
    text: "你加入一个新项目，前两周要跟两位负责人中的一位配合。两个人都专业，也都愿意支持你。你更愿意先跟谁？",
    options: [
      { text: "林姐会在第一天给你看几个参考样例；你每天傍晚发一次进展，她会留下具体修改意见。", scores: { autonomy: -2 } },
      { text: "周哥会说这件事最后要解决什么，然后把资料和联系人给你；中间主要由你自己安排。", scores: { autonomy: 2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "两张桌子",
    text: "公司搬到新办公室，你可以先挑座位。两个位置都不错，只是一天里的气氛完全不同。",
    options: [
      { text: "靠近茶水间和会议室，消息来得快，经常有人路过顺手问你一句。", scores: { interaction: 2 } },
      { text: "靠窗的角落，走过去要绕一圈，但一坐下能安静做很久。", scores: { interaction: -2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "两种挑战",
    text: "你有机会加入两个短项目，都会辛苦，也都会被看见。你更想选哪一个？",
    options: [
      { text: "比赛型项目：规则固定，榜单每天更新，最后看谁跑到前面。", scores: { competition: 2, pressure: 2 } },
      { text: "探索型项目：答案还没出现，你们要用几周时间把路径试出来。", scores: { exploration: 2, change: 2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "深夜消息",
    text: "晚上十点半，群里突然弹出一条消息：明早要临时给客户看一个版本。没人点名你，但你手里刚好有一部分材料。",
    options: [
      { text: "先把材料整理成能看的样子，发一句“我先拼个初版”。", scores: { initiative: 3, dependability: 1 } },
      { text: "先问清楚客户到底要看什么，避免熬夜做错方向。", scores: { analytical: 2, detail: 1 } },
      { text: "看群里谁最焦虑，私聊他确认现在最缺哪一块。", scores: { empathy: 2, cooperation: 2 } },
      { text: "如果没人负责，你会直接提议分工和截止时间。", scores: { leadership: 3, stress: 1 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "试用期选择",
    text: "试用期第三周，你同时收到两个小机会。两个都不会立刻决定你的去留，但会影响别人如何记住你。",
    options: [
      { text: "跟着资深同事去现场处理一个真实问题，过程可能不会完全按资料走。", scores: { R: 2, stress: 1, change: 1 } },
      { text: "独自整理一份没人做过的分析材料，可能会被负责人看到。", scores: { I: 2, analytical: 2, interaction: -1 } },
      { text: "帮团队重做一次对外展示，让原本平淡的东西更有记忆点。", scores: { A: 2, innovation: 2 } },
      { text: "接手一个新人答疑小群，让大家别在同样的问题上卡住。", scores: { S: 2, empathy: 2, cooperation: 1 } },
      { text: "陪同事去谈一个立场很明确的合作方，看看能不能把局面往前推。", scores: { E: 2, leadership: 1, pressure: 1 } },
      { text: "把部门散落的资料整理成可复用模板，减少后面反复问。", scores: { C: 2, dependability: 2, detail: 1 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "午休谈话",
    text: "午休时，隔壁组同事说起一个项目：没人逼你参与，但他讲到一半，你发现自己有点想插话。",
    options: [
      { text: "你想问他们实际操作时哪一步最容易坏掉。", scores: { R: 2, detail: 1 } },
      { text: "你想知道他们怎么证明这个判断是对的。", scores: { I: 2, analytical: 2 } },
      { text: "你脑子里已经出现了另一种讲法和呈现方式。", scores: { A: 2, innovation: 2 } },
      { text: "你注意到他表面在讲项目，真正反复提到的是自己的压力。", scores: { S: 2, empathy: 3 } },
      { text: "你想问现在谁能拍板，以及还缺什么资源。", scores: { E: 2, leadership: 1 } },
      { text: "你想让他把流程画出来，看看哪里没有交接清楚。", scores: { C: 2, dependability: 1, analytical: 1 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "周报空白",
    text: "周五下午，你打开周报模板。这个星期忙得很碎，但真要写时又觉得说不清自己到底完成了什么。",
    options: [
      { text: "按事项逐条回忆，把每件事的状态补齐。", scores: { C: 2, dependability: 2, detail: 1 } },
      { text: "先找这周最关键的一个变化，围绕它解释价值。", scores: { analytical: 2, achievement: 1 } },
      { text: "把它写得更像一个小故事，让别人能看懂过程。", scores: { A: 2, innovation: 1 } },
      { text: "去问合作的人：这周我帮到你的地方是什么？", scores: { S: 2, cooperation: 2 } },
      { text: "突出下一步计划，让别人知道你准备主动推进什么。", scores: { E: 1, initiative: 2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "临时出差",
    text: "负责人问你能不能明天临时去外地一天。事情不复杂，但现场情况可能和资料里写的不一样。",
    options: [
      { text: "可以去。到了现场再看，很多问题要摸到实物才知道。", scores: { R: 2, change: 1, stress: 1 } },
      { text: "可以去，但今晚你会先把资料和问题清单列好。", scores: { I: 1, C: 1, detail: 2, dependability: 1 } },
      { text: "你更想先远程聊一轮，确认这趟到底要解决什么。", scores: { analytical: 2, autonomy: -1 } },
      { text: "如果现场需要协调很多人，你反而会有点兴奋。", scores: { E: 2, interaction: 2, leadership: 1 } },
      { text: "如果只是陪客户稳定情绪，你也愿意去把话听完整。", scores: { S: 2, empathy: 2 } }
    ]
  },
  {
    chapter: "场景片段",
    title: "办公室灯光",
    text: "晚上只剩几个人加班。灯光很亮，空气很静，每个人都在用自己的方式处理压力。你最可能靠近哪一种状态？",
    options: [
      { text: "戴上耳机，把一个难题拆到终于能动手。", scores: { I: 2, analytical: 2, interaction: -1 } },
      { text: "把白天没讲清楚的想法重新画成一张图。", scores: { A: 2, innovation: 2 } },
      { text: "确认大家还有没有卡住，顺手帮一个人把问题理顺。", scores: { S: 2, cooperation: 2 } },
      { text: "拉出进度表，判断明早之前必须保住哪几个结果。", scores: { C: 2, achievement: 1, stress: 1 } },
      { text: "去找负责人快速对齐，避免所有人各做各的。", scores: { E: 2, leadership: 2 } }
    ]
  }
];

const activeQuestions = questions.slice(0, 18);

const state = {
  index: 0,
  answers: []
};

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const stageScreen = document.querySelector("#stage-screen");
const resultScreen = document.querySelector("#result-screen");
const startBtn = document.querySelector("#start-btn");
const backBtn = document.querySelector("#back-btn");
const resetBtn = document.querySelector("#reset-btn");
const againBtn = document.querySelector("#again-btn");
const stageContinueBtn = document.querySelector("#stage-continue-btn");
const stageRestartBtn = document.querySelector("#stage-restart-btn");
const resultContinueBtn = document.querySelector("#result-continue-btn");

function showScreen(screen) {
  [startScreen, quizScreen, stageScreen, resultScreen].forEach((item) => item.classList.remove("active"));
  screen.classList.add("active");
}

function renderQuestion() {
  const q = activeQuestions[state.index];
  document.querySelector("#chapter").textContent = q.chapter;
  document.querySelector("#question-title").textContent = q.title;
  document.querySelector("#question-text").textContent = q.text;
  document.querySelector("#current-index").textContent = String(state.index + 1);
  document.querySelector("#total-count").textContent = String(activeQuestions.length);
  document.querySelector("#progress-bar").style.width = `${((state.index + 1) / activeQuestions.length) * 100}%`;
  backBtn.disabled = state.index === 0;

  const options = document.querySelector("#options");
  options.innerHTML = "";
  q.options.forEach((option, optionIndex) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option.text;
    btn.addEventListener("click", () => chooseOption(optionIndex));
    options.appendChild(btn);
  });
}

function chooseOption(optionIndex) {
  state.answers[state.index] = optionIndex;
  const nextIndex = state.index + 1;
  if (isStageBoundary(nextIndex) || nextIndex >= activeQuestions.length) {
    state.index = nextIndex;
    renderStageResult(getStageByAnswerCount(nextIndex));
    return;
  }
  state.index = nextIndex;
  renderQuestion();
}

function isStageBoundary(answerCount) {
  return stages.some((stage) => stage.range[1] === answerCount);
}

function getStageByAnswerCount(answerCount) {
  return stages.find((stage) => stage.range[1] === answerCount) || stages[stages.length - 1];
}

function resetAll() {
  state.index = 0;
  state.answers = [];
  showScreen(startScreen);
}

function getAllDimensions() {
  return [
    ...Object.keys(interests),
    ...Object.keys(styles),
    ...Object.keys(contextAxes)
  ];
}

function calculateScores(range = [0, activeQuestions.length]) {
  const raw = Object.fromEntries(getAllDimensions().map((key) => [key, 0]));
  const max = Object.fromEntries(getAllDimensions().map((key) => [key, 0]));
  const min = Object.fromEntries(getAllDimensions().map((key) => [key, 0]));
  const [start, end] = range;

  activeQuestions.slice(start, end).forEach((q, offset) => {
    const questionIndex = start + offset;
    const answerIndex = state.answers[questionIndex];
    const chosen = q.options[answerIndex];
    if (!chosen) return;

    Object.entries(chosen.scores).forEach(([key, value]) => {
      raw[key] += value;
    });

    getAllDimensions().forEach((key) => {
      const best = Math.max(0, ...q.options.map((option) => option.scores[key] || 0));
      const worst = Math.min(0, ...q.options.map((option) => option.scores[key] || 0));
      max[key] += best;
      min[key] += worst;
    });
  });

  const normalized = {};
  Object.keys(raw).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(contextAxes, key)) {
      normalized[key] = normalizeAxisScore(raw[key], min[key], max[key]);
    } else {
      normalized[key] = max[key] > 0 ? Math.max(0, Math.round((raw[key] / max[key]) * 100)) : 0;
    }
  });

  return { raw, max, min, normalized };
}

function normalizeAxisScore(value, min, max) {
  if (min < 0 && max > 0) {
    return Math.round(((value - min) / (max - min)) * 100);
  }
  if (min === 0 && max > 0) {
    return value > 0 ? Math.round(50 + (value / max) * 50) : 50;
  }
  if (min < 0 && max === 0) {
    return value < 0 ? Math.round(50 - (value / min) * 50) : 50;
  }
  return 50;
}

function sortKeys(obj, keys) {
  return [...keys].sort((a, b) => obj[b] - obj[a]);
}

function renderResult() {
  const { raw, normalized } = calculateScores();
  const interestOrder = sortKeys(normalized, Object.keys(interests));
  const primary = interestOrder[0];
  const secondary = interestOrder[1];
  const code = `${primary}${secondary}`;
  const reverseCode = `${secondary}${primary}`;
  const archetype = archetypes[code] || archetypes[reverseCode] || fallbackArchetype;

  document.querySelector("#result-title").textContent = `${code} ${archetype[0]}`;
  document.querySelector("#result-summary").textContent = archetype[1];

  renderFinalOverview(normalized, raw, interestOrder);
  renderStyleLists(normalized);
  renderContext(raw);
  renderCareerMatches(primary, secondary, normalized, raw);
  renderTensions(normalized, raw);
  renderAdvice(primary, secondary, normalized, raw);
  resultContinueBtn.classList.toggle("hidden", state.index >= activeQuestions.length);
  showScreen(resultScreen);
}

function renderStageResult(stage) {
  const { raw, normalized } = calculateScores(stage.range);
  const interestOrder = sortKeys(normalized, Object.keys(interests));
  const primary = interestOrder[0];
  const secondary = interestOrder[1];
  const styleOrder = sortKeys(normalized, Object.keys(styles));

  document.querySelector("#stage-kicker").textContent = `${stage.name}完成`;
  document.querySelector("#stage-title").textContent = stage.title;
  document.querySelector("#stage-summary").textContent = stage.summary;
  document.querySelector("#stage-map-title").textContent = stage.mapTitle;

  const stageBars = document.querySelector("#stage-bars");
  stageBars.innerHTML = "";
  if (stage.kind === "interest") {
    renderBarsInto(stageBars, interestOrder, normalized, (key) => `${key} ${interests[key].name}`);
    renderStageDetail(getInterestStageDetail(primary, secondary, normalized));
    document.querySelector("#stage-notes").innerHTML = [
      `目前更突出的兴趣线索是 ${interests[primary].name} 和 ${interests[secondary].name}。`,
      "这只是第一层吸引力，不代表最终职业建议。",
      "继续下一阶段会观察你在真实工作片段里的行动方式。"
    ].map((item) => `<li>${item}</li>`).join("");
  } else if (stage.kind === "style") {
    const topStyles = styleOrder.slice(0, 5);
    renderBarsInto(stageBars, topStyles, normalized, (key) => styles[key]);
    renderStageDetail(getStyleStageDetail(topStyles, normalized));
    document.querySelector("#stage-notes").innerHTML = [
      `目前更突出的工作风格是 ${topStyles.slice(0, 3).map((key) => styles[key]).join("、")}。`,
      "如果兴趣和工作风格不完全一致，后续报告会把这种拉扯解释出来。",
      "继续下一阶段会观察你更适合什么工作环境。"
    ].map((item) => `<li>${item}</li>`).join("");
  } else {
    renderContextInto(stageBars, raw, normalized);
    renderStageDetail(getContextStageDetail(raw));
    document.querySelector("#stage-notes").innerHTML = [
      "你已经完成当前 MVP 的全部题目。",
      "最终画像会把兴趣、风格和环境三层合并解释。",
      "如果结果出现矛盾，它会被当成线索，而不是错误。"
    ].map((item) => `<li>${item}</li>`).join("");
  }

  const isLastStage = stage.range[1] >= activeQuestions.length;
  stageContinueBtn.textContent = isLastStage ? "查看最终画像" : "继续下一阶段";
  showScreen(stageScreen);
}

function renderStageDetail(paragraphs) {
  document.querySelector("#stage-detail-copy").innerHTML = paragraphs
    .map((item) => `<p>${item}</p>`)
    .join("");
}

function getInterestStageDetail(primary, secondary, scores) {
  const pair = `${primary}${secondary}`;
  const pairCopy = {
    IR: "你会被“可以拆开的真实系统”吸引：既想知道它为什么这样运转，也想看到它在现实里如何发生作用。",
    RI: "你更容易从具体装置、现场、工具和可触摸的问题进入，再往后追问背后的原理和结构。",
    IC: "你会被线索、编号、规则和异常吸引；相比热闹场景，你更容易靠近能被梳理和验证的信息。",
    CI: "你倾向先找到秩序和边界，再进入分析；你对“混在一起的东西如何归位”比较敏感。",
    AE: "你会被表达与影响的交汇处吸引：一个想法不仅要成立，还要被看见、被推动。",
    EA: "你容易靠近有外部反馈的表达场景，喜欢让想法进入人群和决策现场。",
    SE: "你会被人与人之间的需求、立场和互动牵引，尤其关注关系如何推动事情往前走。",
    ES: "你对人群、资源和局面变化敏感，容易靠近需要沟通、协调和推动的场景。"
  };
  const main = pairCopy[pair] || pairCopy[`${secondary}${primary}`] ||
    `你当前更容易靠近“${cleanInterestDesc(primary)}”，同时也会被“${cleanInterestDesc(secondary)}”牵引。`;
  const low = Object.keys(interests).sort((a, b) => scores[a] - scores[b])[0];
  return [
    main,
    `这不是在说你只能做 ${interests[primary].name} 相关工作，而是说你的注意力会先落到这类线索上。后面的阶段会继续验证：你是只被它吸引，还是也擅长在这里持续行动。`,
    `相对较弱的线索是 ${interests[low].name}。这通常意味着它不是你的第一入口，而不是完全不能做。`
  ];
}

function getStyleStageDetail(topStyles, scores) {
  const top3 = topStyles.slice(0, 3);
  const lead = top3.map((key) => styles[key]).join("、");
  const styleMeaning = {
    analytical: "你遇到问题时会先寻找结构和因果，不太满足于只处理表面现象。",
    detail: "你对小缺口比较敏感，容易注意到别人觉得可以先放一放的瑕疵。",
    dependability: "你会自然关注承诺、交付和可被信赖的节奏。",
    innovation: "你愿意换一种方法，不会只因为过去这样做就继续照旧。",
    initiative: "你在有空间时会先推动一小步，而不是一直等待正式指令。",
    leadership: "你会注意谁在定方向、谁来收束局面，必要时愿意把下一步说出来。",
    empathy: "你会捕捉人的情绪和没说出口的顾虑。",
    cooperation: "你会关注事情能不能被大家一起接住，而不是只看个人完成。",
    achievement: "你会被可见进展、阶段胜利和结果反馈激活。",
    stress: "你在压力片段里更倾向于维持动作，而不是立刻退开。"
  };
  const paragraphs = [
    `这一阶段显示，你当前更突出的工作反应是 ${lead}。这比“你喜欢什么”更接近真实工作里的表现。`,
    top3.map((key) => styleMeaning[key]).join(" "),
    "如果这一层和第一阶段兴趣一致，说明你的吸引力和行动方式在同一个方向上；如果不一致，最终报告会把它解释为“兴趣入口”和“工作习惯”的差异。"
  ];
  const low = Object.keys(styles).sort((a, b) => scores[a] - scores[b]).slice(0, 2);
  paragraphs.push(`当前较弱的反应是 ${low.map((key) => styles[key]).join("、")}。这不等于短板，更像是在提醒：这些场景可能需要工具、流程或合作对象来补足。`);
  return paragraphs;
}

function getContextStageDetail(raw) {
  const labels = buildContextLabels(raw);
  const strong = labels.filter((item) => Math.abs(item.value) >= 2);
  const core = strong.length ? strong.map((item) => item.label).join("、") : "环境偏好整体比较弹性";
  const explanations = {
    autonomy: raw.autonomy >= 2 ? "你更容易在保留方法选择权时进入状态。" : raw.autonomy <= -2 ? "你更容易在反馈清楚、参考样例明确时稳定发挥。" : "你对指导和自主的需求比较随场景变化。",
    change: raw.change >= 2 ? "你能接受任务中途出现新信息。" : raw.change <= -2 ? "你更适合节奏相对稳定、任务范围较清楚的安排。" : "你对变化和稳定都有一定适应性。",
    interaction: raw.interaction >= 2 ? "你不排斥信息在人群中快速流动。" : raw.interaction <= -2 ? "你需要安静时段来完成深度处理。" : "互动密度不是当前最强决定因素。",
    competition: raw.competition >= 2 ? "明确比较和外部反馈会推动你调整动作。" : raw.competition <= -2 ? "你更适合低比较、重协作的节奏。" : "竞争感对你的影响偏中性。",
    pressure: raw.pressure >= 2 ? "一定强度的外部压力会让任务边界更清晰。" : raw.pressure <= -2 ? "持续压力会消耗你的判断质量。" : "压力强度目前不是最明显的偏好。",
    exploration: raw.exploration >= 2 ? "你可以进入尚未有答案的探索任务。" : raw.exploration <= -2 ? "你更适合有规则、有边界的任务环境。" : "规则和探索之间，你目前没有极端偏向。"
  };
  return [
    `这一阶段地图展示的是六个环境轴：自主/指导、变化/稳定、互动密度、竞争强度、压力强度、规则/探索。当前更明显的线索是：${core}。`,
    Object.keys(contextAxes).map((key) => explanations[key]).join(" "),
    "环境画像不是能力判断，而是成本判断：不合适的环境也能做，但会更依赖自控；合适的环境会让你的优势更自然地出现。"
  ];
}

function cleanInterestDesc(key) {
  return interests[key].desc.replace("被", "").replace("吸引。", "").replace("。", "");
}

function renderBarsInto(container, keys, scores, labelFn) {
  keys.forEach((key) => {
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <strong>${labelFn(key)}</strong>
      <div class="bar-bg"><div class="bar-fill" style="width:${scores[key]}%"></div></div>
      <span>${scores[key]}</span>
    `;
    container.appendChild(row);
  });
}

function renderContextInto(container, raw, normalized) {
  buildContextLabels(raw).forEach(({ key, label, value }) => {
    const displayValue = axisDisplayScore(value);
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <strong>${label}</strong>
      <div class="bar-bg"><div class="bar-fill" style="width:${displayValue}%"></div></div>
      <span>${displayValue}</span>
    `;
    container.appendChild(row);
  });
}

function axisDisplayScore(value) {
  if (value >= 3) return 85;
  if (value === 2) return 75;
  if (value === 1) return 62;
  if (value === 0) return 50;
  if (value === -1) return 38;
  if (value === -2) return 25;
  return 15;
}

function renderInterestBars(scores, order) {
  const container = document.querySelector("#interest-bars");
  container.innerHTML = "";
  renderBarsInto(container, order, scores, (key) => `${key} ${interests[key].name}`);
}

function renderFinalOverview(scores, raw, interestOrder) {
  const container = document.querySelector("#interest-bars");
  const styleOrder = sortKeys(scores, Object.keys(styles));
  const contextItems = buildContextLabels(raw)
    .map((item) => ({ ...item, score: axisDisplayScore(item.value) }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  const rows = [
    ...interestOrder.slice(0, 2).map((key) => ({
      key,
      label: `兴趣主轴：${key} ${interests[key].name}`,
      value: scores[key]
    })),
    ...styleOrder.slice(0, 3).map((key) => ({
      key,
      label: `工作风格：${styles[key]}`,
      value: scores[key]
    })),
    ...contextItems.slice(0, 2).map((item) => ({
      key: item.key,
      label: `环境条件：${item.label}`,
      value: item.score
    }))
  ];

  container.innerHTML = "";
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "bar-row";
    item.innerHTML = `
      <strong>${row.label}</strong>
      <div class="bar-bg"><div class="bar-fill" style="width:${row.value}%"></div></div>
      <span>${row.value}</span>
    `;
    container.appendChild(item);
  });
}

function renderStyleLists(scores) {
  const styleKeys = Object.keys(styles);
  const ordered = sortKeys(scores, styleKeys);
  const top = ordered.slice(0, 3);
  const low = ordered.slice(-2).reverse();

  document.querySelector("#top-styles").innerHTML = top
    .map((key) => `<li><strong>${styles[key]}</strong>：${styleCopy(key, "top")}</li>`)
    .join("");
  document.querySelector("#low-styles").innerHTML = low
    .map((key) => `<li><strong>${styles[key]}</strong>：${styleCopy(key, "low")}</li>`)
    .join("");
}

function styleCopy(key, mode) {
  const topCopy = {
    achievement: "你更容易被目标、完成和可见结果激活。",
    initiative: "你倾向于在边界不完全清楚时先推动一小步。",
    leadership: "你会自然关注方向、决策和责任归属。",
    cooperation: "你重视协作质量，也会关注团队能否一起推进。",
    empathy: "你容易捕捉他人的情绪、处境和真实需要。",
    detail: "你对遗漏、瑕疵和准确性比较敏感。",
    dependability: "你重视承诺、稳定交付和可信赖感。",
    innovation: "你愿意尝试新方法，不太满足于照旧执行。",
    analytical: "你会本能地拆解问题、寻找结构和因果。",
    stress: "你在压力、批评或不确定中仍能维持行动。"
  };
  const lowCopy = {
    achievement: "硬排名和持续比较未必是你的最佳燃料。",
    initiative: "在目标模糊时，你可能需要更明确的授权或边界。",
    leadership: "你未必总想站到决策中心，更可能偏好专业贡献。",
    cooperation: "你可能更重视任务本身，协作机制需要被设计清楚。",
    empathy: "你可能不总是先处理情绪信号，需要刻意补充观察。",
    detail: "长期细碎校对可能会消耗你，需要工具或流程兜底。",
    dependability: "过强的固定承诺可能让你感到束缚，需要弹性空间。",
    innovation: "你可能更相信成熟方法，而不是频繁推翻重来。",
    analytical: "过度抽象分析可能不是你的自然入口，你更适合从行动中理解。",
    stress: "持续高压和冲突会明显影响你的发挥。"
  };
  return mode === "top" ? topCopy[key] : lowCopy[key];
}

function renderContext(raw) {
  const list = document.querySelector("#context-list");
  list.innerHTML = "";
  buildContextLabels(raw).forEach(({ label }) => {
    const item = document.createElement("li");
    item.textContent = label;
    list.appendChild(item);
  });
}

function renderCareerMatches(primary, secondary, scores, raw) {
  const matches = getCareerMatches(primary, secondary, scores, raw).slice(0, 5);
  const container = document.querySelector("#career-matches");
  container.innerHTML = matches.map((match) => `
    <article class="match-item">
      <h3>${match.industry}</h3>
      <p>${match.reason}</p>
      <ul>
        ${match.roles.map((role) => `<li>${role}</li>`).join("")}
      </ul>
    </article>
  `).join("");

  document.querySelector("#avoid-list").innerHTML = getAvoidDirections(primary, secondary, scores, raw)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function getCareerMatches(primary, secondary, scores, raw) {
  const code = `${primary}${secondary}`;
  const isSystemProfile = ["I", "R", "C"].includes(primary) || ["I", "R", "C"].includes(secondary);
  const highAnalysis = scores.analytical >= 45 || scores.I >= 45;
  const highQuality = scores.detail >= 45 || scores.C >= 45 || scores.dependability >= 45;
  const likesStructure = raw.change <= 0 || raw.exploration <= 0 || scores.C >= 45;
  const likesConcrete = scores.R >= 35;
  const candidates = [];

  if (isSystemProfile && highAnalysis) {
    candidates.push({
      industry: "企业软件 / SaaS / 业务系统",
      reason: "适合把业务流程、数据口径和系统边界拆清楚，尤其是从互联网数据产品迁移到企业服务场景。",
      roles: ["业务系统分析师", "数据产品经理", "ERP/CRM/OA 产品经理", "企业数据平台产品经理"]
    });
  }

  if (isSystemProfile && likesConcrete) {
    candidates.push({
      industry: "制造业数字化 / 工业软件 / 智能制造",
      reason: "这里有真实设备、流程、质量、库存和交付问题，适合偏系统诊断和流程优化的人。",
      roles: ["MES/WMS/SCM 产品经理", "工业数据产品经理", "质量数据分析", "流程优化产品经理"]
    });
  }

  if (highAnalysis && (scores.innovation >= 35 || scores.I >= 45)) {
    candidates.push({
      industry: "AI 应用落地 / Agent 工作流",
      reason: "适合做 AI 如何进入企业流程，而不是只做概念包装；重点在输入、输出、流程闭环和异常处理。",
      roles: ["AI 应用产品经理", "AI Agent 工作流产品经理", "AI 质检产品经理", "RPA + AI 自动化产品经理"]
    });
  }

  if (highQuality && highAnalysis) {
    candidates.push({
      industry: "风控 / 数据安全 / 合规科技",
      reason: "适合规则、证据链、异常识别、质量标准和可验证结果较强的工作结构。",
      roles: ["风控产品经理", "反欺诈产品经理", "数据安全产品经理", "合规科技产品经理"]
    });
  }

  if (likesConcrete && likesStructure) {
    candidates.push({
      industry: "供应链 / 物流 / 仓储系统",
      reason: "供应链天然是节点、约束、异常、成本和时效组成的复杂系统，适合流程拆解和效率提升。",
      roles: ["供应链产品经理", "物流数据产品经理", "WMS/TMS 产品经理", "库存优化/履约分析"]
    });
  }

  if (code.includes("S") && highAnalysis) {
    candidates.push({
      industry: "医疗信息化 / 医疗 AI",
      reason: "适合把复杂流程、数据质量、质控规则和专业场景结合起来，但需要补行业知识。",
      roles: ["医疗数据产品经理", "医院信息化产品经理", "医保控费产品经理", "临床质控产品经理"]
    });
  }

  if (!candidates.length) {
    candidates.push({
      industry: "复合型产品与分析岗位",
      reason: "你的画像呈现混合倾向，建议优先寻找既有问题拆解、又有明确业务闭环的岗位。",
      roles: ["数据产品经理", "业务分析师", "产品运营分析", "流程改进专员"]
    });
  }

  return candidates;
}

function getAvoidDirections(primary, secondary, scores, raw) {
  const avoid = [];
  const lowestInterest = Object.keys(interests).sort((a, b) => scores[a] - scores[b])[0];
  const highStyles = Object.keys(styles).filter((key) => scores[key] >= 55);

  if (raw.interaction <= -2 && scores.E < 40) {
    avoid.push("高频陌生人沟通、长时间应酬、主要靠即时关系推进的岗位。");
  }
  if (raw.interaction >= 2 && scores.I < 35) {
    avoid.push("长期独处、反馈很慢、需要长时间单人钻研但很少交流的岗位。");
  }
  if (raw.change <= -2 || raw.exploration <= -2) {
    avoid.push("目标频繁漂移、规则尚未形成、每天都要推翻前一天判断的团队。");
  }
  if (raw.change >= 2 && raw.exploration >= 2) {
    avoid.push("长期高度重复、几乎没有试错空间、只按固定步骤执行的岗位。");
  }
  if (raw.competition >= 2 && scores.cooperation >= 55) {
    avoid.push("过度个人排名、弱协作、信息互相封锁的竞争环境。");
  }
  if (raw.competition <= -2 && scores.achievement >= 55) {
    avoid.push("长期没有结果反馈、进展不可见、做多做少差别不大的环境。");
  }
  if (scores.detail >= 55 || scores.analytical >= 55) {
    avoid.push("不允许追问数据口径、验收标准和问题根因，只要求快速交付表层结果的环境。");
  }
  if (scores.innovation >= 55) {
    avoid.push("成熟流程被绝对固定、不能尝试替代方案的岗位。");
  }
  if (lowestInterest === "A" && scores.A < 25) {
    avoid.push("核心产出高度依赖审美表达、内容创意和品牌叙事的岗位。");
  }
  if (lowestInterest === "E" && scores.E < 25) {
    avoid.push("核心产出高度依赖说服、谈判、资源交换和外部竞争的岗位。");
  }
  if (lowestInterest === "C" && scores.C < 25) {
    avoid.push("每天大量处理规则、表格、归档和重复校对的岗位。");
  }
  if (!avoid.length) {
    avoid.push(`当前没有明显需要回避的单一方向；更建议关注团队是否支持你的高分风格：${highStyles.slice(0, 3).map((key) => styles[key]).join("、")}。`);
  }
  return [...new Set(avoid)].slice(0, 4);
}

function buildContextLabels(raw) {
  const neutralLabels = {
    autonomy: "自主/指导都可适应",
    change: "变化/稳定之间弹性较高",
    interaction: "互动密度偏弹性",
    competition: "竞争强度偏弹性",
    pressure: "压力强度偏弹性",
    exploration: "规则/探索之间弹性较高"
  };
  const items = Object.entries(contextAxes).map(([key, labels]) => {
    const value = raw[key];
    const label = value >= 2 ? labels[1] : value <= -2 ? labels[0] : neutralLabels[key];
    return { key, label, value };
  });
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.label)) return false;
    seen.add(item.label);
    return true;
  });
}

function renderTensions(scores, raw) {
  const tensions = [];
  if (scores.S >= 55 && raw.interaction <= -1) {
    tensions.push("你关心人，但未必适合高频服务型互动；低频、深度、一对一的支持关系可能更适合你。");
  }
  if (scores.E >= 55 && raw.competition <= -1) {
    tensions.push("你有影响他人的兴趣，但不一定喜欢强排名环境；你可能更适合共创式推动，而不是纯竞争式推进。");
  }
  if ((scores.I >= 55 || scores.A >= 55) && raw.autonomy <= -1) {
    tensions.push("你会被探索或创造吸引，但当前也需要清晰反馈；过度自由可能反而让你失去落点。");
  }
  if (scores.C >= 55 && raw.exploration >= 1) {
    tensions.push("你既需要结构，也会被开放问题吸引；适合的是有边界的探索，而不是完全混乱的自由。");
  }

  const block = document.querySelector("#tension-block");
  const list = document.querySelector("#tension-list");
  if (tensions.length === 0) {
    block.classList.add("hidden");
    return;
  }
  block.classList.remove("hidden");
  list.innerHTML = tensions.map((item) => `<li>${item}</li>`).join("");
}

function renderAdvice(primary, secondary, scores, raw) {
  const advice = [
    `观察最近一次让你真正投入的任务，它很可能包含 ${interests[primary].name} 或 ${interests[secondary].name} 的活动元素。`,
    "下一次选择项目或岗位时，先问清楚：目标如何定义、反馈多快、冲突强度多高、自由度有多大。",
    raw.autonomy >= 1
      ? "转行表达可以强调：你擅长把复杂业务拆成可执行、可验证、可优化的系统。"
      : "转行表达可以强调：你擅长在清晰目标下建立指标、流程和质量标准。"
  ];
  document.querySelector("#advice-list").innerHTML = advice.map((item) => `<li>${item}</li>`).join("");
}

startBtn.addEventListener("click", () => {
  state.index = 0;
  state.answers = [];
  renderQuestion();
  showScreen(quizScreen);
});

stageContinueBtn.addEventListener("click", () => {
  if (state.index >= activeQuestions.length) {
    renderResult();
    return;
  }
  renderQuestion();
  showScreen(quizScreen);
});

stageRestartBtn.addEventListener("click", resetAll);

backBtn.addEventListener("click", () => {
  if (state.index > 0) {
    state.index -= 1;
    renderQuestion();
  }
});

resetBtn.addEventListener("click", resetAll);
againBtn.addEventListener("click", resetAll);

resultContinueBtn.addEventListener("click", () => {
  if (state.index >= activeQuestions.length) return;
  renderQuestion();
  showScreen(quizScreen);
});
