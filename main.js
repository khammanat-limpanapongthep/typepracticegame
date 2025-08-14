window.addEventListener('DOMContentLoaded', () => {
  // ---------- metrics ----------
  const FONT_FAMILY = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";
  const FONT_SIZE = 28;
  const LETTER_SPACING = 1;
  const LINE_HEIGHT_FACTOR = 1.7;

  const CARET_COLOR = "#e2b714";
  const CARET_THICKNESS = 2;
  const CARET_TOP = 0.15;
  const CARET_HEIGHT = 0.78;

  // ---------- config ----------
  const TIMER_LEN = 30; // default 30s
  const WORD_GOAL_DEFAULT = 50;

  let COLORS = {
    bg: "#0d1623",
    ink: "#9bb0c9",
    correct: "#7cffc4",
    wrong: "#ff6b6b",
    caret: CARET_COLOR
  };

  const SAMPLES = [
    "monkeys type better when coffee is near and bugs run away",
    "practice every day and tiny gains stack into big jumps",
    "focus on accuracy then the speed will arrive on its own",
    "clean code reads like prose and bends without breaking",
    "java and python both shine when tested with care",
    "consistency beats intensity so show up for ten minutes",
    "measure what matters wpm accuracy and calm breathing",
    "small hands big brain type practice never skips warmup",
    "arrays lists maps sets know your tools and use them well",
    "latency hides in loops profile before you optimize",
    "syntax errors vanish when compilers finally approve the build",
    "memory leaks fade once references release forgotten objects",
    "typing fast demands practice patience and quiet focus",
    "keyboards click and clack bringing rhythm to late night code",
    "developers debug tricky issues during silent sunrise mornings",
    "stack overflow jokes spread quickly among weary coders",
    "version control saves projects from chaotic copy paste wars",
    "ship features often but refactor pieces with deliberate care",
    "review pull requests kindly to grow teammates into experts",
    "good naming whispers intent and prevents future confusion",
    "clean sets loops developers naming with good profile and",
  "but quiet matters memory big near projects",
  "calm debug tested? when memory! from into",
  "beats speed, review naming silent code",
  "better intensity release features objects compilers practice own wpm breaking",
  "future beats references confusion finally into confusion python beats and for prose,- leaks typing",
  "once requests jumps leaks: loops into. coffee when issues",
  "when type- silent wars, developers keyboards night",
  "silent big with compilers java profile",
  "leaks use- calm copy- syntax rhythm the",
  "know shine is keyboards control quickly what coffee both without java",
  "experts developers- near jumps calm demands intent vanish type- pieces better",
  "matters focus errors code typing, shine reads, good focus issues copy requests sunrise",
  "calm calm vanish copy java python",
  "approve wars? patience code paste demands its",
  "good deliberate review tested what saves prose-? up",
  "breaking ship use into from consistency forgotten maps breaking",
  "without issues,. keyboards day review bugs without",
  "syntax its ten for near copy into tricky focus in tricky; from",
  "show optimize beats up; into is java sets to clean",
  "run will to grow when debug into sunrise measure matters vanish? know to from",
  "developers quickly rhythm vanish! its focus on objects bringing kindly experts gains",
  "every chaotic optimize day often- leaks",
  "ship is compilers show lists, bringing its near rhythm; good",
  "future maps before often review prose developers fast? among; breathing",
  "code will objects tiny tools both then? them own",
  "show overflow tricky deliberate minutes.- arrays care when with",
  "bringing optimize consistency hides; will big sunrise when during focus maps",
  "beats issues intent forgotten run reads saves code type minutes future fast",
  "requests sets- projects big before is show into stack; before jumps its",
  "version its before what, prevents developers chaotic know, them when",
  "run stack click measure lists consistency",
  "them arrive grow? clack prose quickly bringing during when; beats",
  "click leaks like tricky lists coders grow arrays its often tricky",
  "review show whispers once shine teammates issues teammates",
  "your tricky loops objects both version prevents sunrise minutes, consistency references naming- loops",
  "patience saves! bringing build projects objects arrays use",
  "finally wars breaking projects whispers projects intent stack future",
  "late breaking wars practice tricky. intent them in its",
  "control clean build into arrive consistency intent day python copy errors intent",
  "show accuracy code from and control; weary kindly away",
  "then accuracy intent issues near focus syntax quickly deliberate wpm them",
  "mornings on release profile reads: often leaks breaking use practice. own in",
  "ship type your breaking-: practice tiny beats fast references",
  "late both,; care maps is control tiny when",
  "clean away: intensity reads minutes intent but java: quickly jokes focus monkeys sets",
  "and your! type for type focus prevents! lists profile",
  "vanish bends bugs loops measure: tricky! know and day",
  "build wars developers latency version practice",
  "both its syntax loops consistency clack good then- away issues",
  "pull better saves paste calm focus before keyboards click practice during",
  "monkeys on matters kindly is jumps type intent: intensity- its",
  "into its latency jumps? spread into bends. version lists jokes optimize",
  "click stack- to; better patience to for",
  "rhythm tools with night java projects coffee jumps tested",
  "weary from whispers bugs reads clack well without pull developers latency requests quiet",
  "intensity own kindly patience ship. review well with bringing",
  "on wars late! errors what naming projects code good prose without often; for approve",
  "and clack! ten when from java coders python better into. arrays",
  "tiny hides jokes what java wpm them among prevents better profile click in",
  "know features late copy when use stack coders matters optimize better quiet",
  "latency typing debug intent kindly care saves matters when",
  "coders wars-; code syntax them teammates jumps",
  "accuracy future silent once ten near fade teammates compilers",
  "both code- into type among jumps sets syntax fade the into control memory",
  "wpm will grow leaks review compilers matters finally consistency monkeys control show practice",
  "to matters- projects wars silent; like code code measure once",
  "requests demands know kindly stack keyboards into sunrise projects whispers measure sets syntax into",
  "pieces and gains during during jokes maps overflow build from",
  "code developers weary minutes before spread care maps on what",
  "wars breaking clean copy patience- teammates developers will will keyboards practice",
  "demands teammates calm debug build monkeys; maps coders. the",
  "breaking ship, deliberate teammates lists wars! show tiny arrays",
  "stack use naming features future matters will better late hides care errors",
  "accuracy type minutes tested show developers- ship night up then reads keyboards jokes references",
  "from kindly, late? profile silent in silent when away",
  "click weary lists monkeys references: tiny",
  "near build night errors away stack will grow requests references",
  "projects rhythm quiet on calm overflow focus and? before",
  "projects references? syntax naming wars kindly will: forgotten",
  "silent night wars own measure syntax when demands know clean prevents when: type",
  "approve references both quickly developers maps, into experts wars",
  "loops arrays well stack rhythm care overflow build late is",
  "type typing once among patience- pieces; prose debug beats",
  "coffee ten monkeys its, without often? refactor prevents whispers wpm experts developers",
  "projects optimize debug saves into finally build features python bringing measure wpm java",
  "when know, them every often from consistency",
  "minutes own copy: clack and, measure",
  "tricky know tricky quiet future calm experts debug click leaks",
  "tiny ship practice? is: chaotic matters quiet will chaotic intensity clack",
  "vanish breathing copy matters python chaotic before forgotten day: patience demands",
  "consistency tricky spread? wpm will up patience silent maps when: coffee grow",
  "good matters bends. practice: prevents once with own without",
  "quickly quickly coders confusion ten kindly coffee",
  "quickly sets optimize big into tiny loops night",
  "focus overflow! into requests among breaking on on chaotic pull copy clean calm compilers",
  "control breathing big python compilers? jokes the release- breaking",
  "calm tools your build? syntax. approve",
  "for monkeys well typing reads forgotten your tested optimize during- on approve finally bringing",
  "then ten. experts quiet without focus sunrise: code syntax",
  "pull errors review. then prevents wpm! night",
  "both well confusion kindly clean. when references optimize patience click coffee; clean jokes",
  "both loops practice calm calm experts click stack",
  "refactor click;! know clean sunrise from future its care java measure future shine",
  "forgotten leaks approve pieces python review then wpm up into debug ten sets prevents",
  "issues control? optimize tested practice: prose tested",
  "ship quiet coders near every like arrays clack arrive finally control rhythm prose build",
  "type finally for during: focus ten once! objects",
  "tricky silent weary compilers know: tiny developers is, practice minutes once python then",
  "memory keyboards both pieces silent memory them clack beats show references when",
  "silent spread jumps whispers but debug projects intent run what deliberate; calm wars errors",
  "on big hides what bends coffee every arrays near bugs from python projects coders",
  "near will java vanish lists control wars jokes among",
  "but breathing type- bringing prose focus without whispers into wpm mornings jumps future python",
  "references tiny sunrise! quickly arrays! clean",
  "type accuracy like shine build to hides better night before: approve",
  "once ship overflow refactor! stack stack mornings- show big",
  "late then keyboards vanish ship better release then during finally coders",
  "but ship review measure- without quiet release; up memory",
  "every when when with forgotten leaks intensity matters demands stack, deliberate among is better",
  "breathing better your when measure focus with; reads up maps day quickly chaotic",
  "release wpm code, clean near every",
  "stack compilers before click late- reads optimize your to consistency errors coders",
  "day fast on tools and near",
  "clean build accuracy well night objects confusion paste own copy is whispers own",
  "matters focus late: type beats typing future; paste night",
  "syntax quiet care deliberate shine better typing. when kindly vanish know",
  "experts intent naming wpm own day up practice in refactor kindly features run. into",
  "reads teammates whispers from memory build night tools paste focus demands. minutes",
  "monkeys quiet on deliberate python whispers forgotten",
  "breathing syntax breathing mornings latency teammates without measure practice accuracy them sets",
  "fade shine silent late stack focus",
  "intent breathing without; java shine big ten",
  "breathing saves stack every to approve arrive prevents focus click",
  "latency big and-- sets approve ten wpm",
  "jumps care leaks is into compilers good often",
  "arrays tools vanish into night what tricky then but during",
  "demands ten prevents build syntax code without; on whispers",
  "fade compilers hides- and tricky shine tricky every? quiet build",
  "during bringing accuracy finally tricky pull spread better vanish",
  "clack gains code ten teammates bringing forgotten show objects focus",
  "kindly sets objects arrays well profile wpm breathing fast- objects",
  "and measure- build stack sunrise: code",
  "night wars: type stack intent wpm- better into often ship",
  "wpm away saves to sunrise breaking arrive lists wars jumps tiny ten confusion",
  "silent among copy; for overflow; wars pieces",
  "tested bringing focus wars java finally reads sets. refactor coders patience",
  "monkeys spread requests pieces code, show prevents coffee with speed- reads",
  "run review prevents; latency them grow kindly control. leaks gains java from",
  "for fast control then syntax code code is? often typing copy jokes accuracy",
  "loops latency java- like reads prose references projects up what its syntax approve optimize",
  "gains coders; paste developers what errors, overflow",
  "developers gains good whispers night. vanish version",
  "use version code its day? confusion wars arrive spread in intent future. bringing quiet",
  "stack chaotic without features gains build into maps finally deliberate, intensity future confusion requests",
  "review click lists from its click",
  "in then. speed monkeys clean leaks chaotic objects paste focus clack debug type",
  "clack copy python care wars them sets will among in from often coders wpm",
  "loops every lists your forgotten pieces rhythm and jokes syntax good. future future",
  "debug focus speed minutes errors objects speed matters before",
  "beats latency loops kindly,: optimize big focus calm when bugs",
  "stack run kindly up clean weary loops sets experts",
  "compilers projects optimize big speed for forgotten pull tricky errors from its code practice",
  "better speed. maps late accuracy clean errors",
  "forgotten minutes forgotten up future maps saves wpm kindly mornings, bugs release click! coffee",
  "chaotic every in. quiet weary naming objects bends objects kindly refactor",
  "your tested silent python accuracy intent its care? without",
  "day forgotten? references- wars day measure night will night your latency future",
  "breathing code paste intent review tiny prevents late features before use coders for",
  "well click paste vanish java shine accuracy well to release control will maps",
  "prose references, practice well then type for like bends your quickly java",
  "for demands prose! saves; click good finally matters coffee",
  "typing copy both night like teammates control know care lists ship grow features your",
  "beats care pull whispers features release? in once",
  "for references: leaks requests intensity! type",
  "late before silent python: silent fade latency good is better will- into confusion bugs",
  "whispers release during refactor leaks bugs bends version often quickly monkeys; objects",
  "click arrays, into kindly- into to matters syntax show",
  "jokes care once near hides prevents away measure- know beats. control copy",
  "pieces for your silent tested review! build bends fast in in fast",
  "sunrise both into vanish click every: into overflow clack coffee",
  "tools good. chaotic syntax, naming and",
  "without from coffee tested own coffee; java reads sunrise stack developers them",
  "the quiet references keyboards pull saves into naming optimize",
  "developers minutes tested loops pieces optimize ten. overflow",
  "profile sunrise forgotten among? refactor release spread bends the",
  "big to to breaking clean finally fade- leaks",
  "experts before forgotten practice with keyboards refactor prevents control spread requests good intensity",
  "review memory like weary bends? hides them",
  "code like. better: weary saves care",
  "tested own speed from confusion maps objects wars",
  "in ten coffee like quiet build ship arrive jokes the; loops? run",
  "pieces confusion issues paste leaks care will! spread",
  "calm coffee late bringing gains: prose minutes. refactor when",
  "day pieces what profile. care fast",
  "typing silent- projects consistency! practice bugs",
  "night your saves in naming paste- fade breaking issues? is intensity among version",
  "speed its quickly syntax keyboards arrive tools clean; to often the",
  "in java among build without jumps",
  "matters breaking what well and maps naming from fade quickly quickly! code use",
  "without click your objects beats quiet review patience speed is near",
  "wars spread: loops among prose and quickly use will rhythm is near- into",
  "is pull approve bringing tiny intent care patience",
  "will but teammates!: java measure what jokes type tested syntax",
  "both is future; objects near weary arrive",
  "prevents know calm features quiet away shine your the is prevents leaks stack",
  "stack errors ten both stack wpm fast loops care",
  "the experts own? your latency saves its objects pull! demands",
  "teammates what code naming ten version good hides developers without",
  "arrays issues? prose beats? late bends for into",
  "rhythm sunrise own pull projects better coffee? vanish prevents up. copy during up",
  "breathing is clean mornings mornings day: know optimize up references on. with",
  "keyboards tools wpm up future to maps! leaks- own once day monkeys vanish",
  "fade forgotten minutes into bugs type matters consistency",
  "bugs near: saves arrive! late like with profile wpm",
  "experts both compilers future build night naming tricky bends beats without patience reads to",
  "release latency confusion. every requests- objects big into chaotic review requests grow naming among",
  "approve into away overflow care near tools for in grow release pieces",
  "well whispers; finally review coffee kindly prevents among up- bringing",
  "optimize arrive jokes but what on pull up approve among chaotic naming?? whispers",
  "projects tested mornings run its tested prose without mornings among arrive",
  "run teammates among; both clack shine objects",
  "requests late arrays like jokes. on what",
  "wpm typing whispers bringing click requests but refactor saves fade",
  "in control practice features with clack",
  "intensity future away, tested sunrise when then sets intent",
  "good grow fade keyboards stack will",
  "day quickly syntax tiny breathing intensity compilers measure what weary code accuracy",
  "demands jokes confusion in into; ten often stack",
  "errors code, optimize debug! beats coders gains keyboards with forgotten silent",
  "issues control!! control quiet before measure release saves vanish future",
  "arrive future when review in your speed shine bends whispers sunrise",
  "gains weary profile quickly sets fade- silent teammates version with saves to, prose",
  "for demands copy care whispers saves focus big consistency loops clack chaotic approve",
  "near care release paste show big away without control measure use when ship sets",
  "every coffee tested syntax focus coffee requests with reads before grow tricky- memory like",
  "mornings naming intent arrive saves shine!! before issues",
  "into approve show coffee errors coffee saves? experts minutes keyboards? fade",
  "pieces latency every bringing syntax consistency near errors intensity projects spread during coders bugs",
  "vanish naming type keyboards often objects prevents rhythm typing saves",
  "optimize review own chaotic accuracy optimize its forgotten, into confusion well shine silent measure",
  "focus when confusion silent naming maps grow java loops away when fade",
  "hides night release syntax its control projects is among",
  "and your intensity refactor and- naming intent keyboards ten review from spread quiet",
  "leaks coders every. grow silent beats the show sets",
  "overflow refactor pull syntax build your control without without control profile sets",
  "sunrise vanish objects accuracy before its focus good good finally",
  "mornings care during deliberate., lists vanish",
  "late beats jumps arrive every; to monkeys leaks type, focus then saves",
  "click tested, hides during syntax issues copy prevents clean. spread will tools day monkeys",
  "near up requests? before code speed in",
  "quickly build arrays teammates! code bends monkeys matters? pieces",
  "loops build tested coders day patience sets like. consistency",
  "vanish clean pieces, well when weary practice both? issues syntax speed",
  "demands beats the breathing references often wars breathing java approve- wpm when teammates",
  "lists is overflow consistency minutes, gains build? prose prevents care",
  "developers to show from code calm future on what fast click from",
  "finally coffee spread beats prose review whispers for minutes future good rhythm jokes stack",
  "syntax gains copy without weary- version grow loops naming to beats bugs prose",
  "review hides; version? care coffee better measure profile",
  "good gains sets stack when once kindly quiet kindly reads stack features into lists",
  "its prevents teammates both review quickly wpm good syntax debug better",
  "python clean bugs tricky night overflow away late prevents naming intensity",
  "from overflow profile measure objects? requests bugs version measure release code bringing",
  "silent latency keyboards, lists when speed- pieces code bringing better type bends control build",
  "copy type prose speed well requests better prose: developers refactor",
  "own vanish- care approve measure know debug vanish leaks",
  "then jokes python rhythm in day gains among focus! better arrive focus",
  "the ship clack naming approve arrays run build",
  "practice features lists sets when vanish demands- speed",
  "your references syntax loops for? every quickly approve copy",
  "overflow leaks but weary code in practice! the teammates leaks- tricky",
  "fast patience will before measure among coders: saves",
  "review speed, projects the control quickly",
  "copy code day whispers? debug care away bends deliberate future chaotic bringing features",
  "prose code arrays stack refactor naming consistency, developers them code deliberate",
  "when approve patience? well silent: rhythm sunrise",
  "silent wpm arrive well stack coffee?; finally often",
  "saves deliberate the tricky is maps stack clack",
  "python deliberate gains stack pieces before use late then day! to clean run click",
  "tricky gains wars will teammates; objects; bends naming bugs",
  "often focus your shine jokes! better- copy care approve good when",
  "quickly run its? own optimize. from",
  "release arrive release its coders leaks teammates; loops up well, pull but run",
  "run review issues: click beats but chaotic! copy deliberate sets",
  "typing approve; prevents approve and; bends experts optimize chaotic developers",
  "the lists coffee latency forgotten review deliberate into your own. among",
  "into among references confusion from own when: weary near type rhythm",
  "requests clean refactor objects, issues- patience wpm focus quiet mornings",
  "during whispers sets ten bends sets show beats intensity: but experts",
  "coders ship vanish jumps. latency sunrise teammates",
  "beats lists jumps requests. stack saves breaking? naming",
  "measure future click type chaotic patience clean rhythm for show latency",
  "well without tricky ten experts rhythm. without; clean coffee",
  "pieces jokes: tools tiny pieces away when",
  "night paste like vanish compilers arrive up clack, is from stack! review",
  "coffee future accuracy kindly prevents better show gains day",
  "gains experts is prevents copy own optimize what optimize",
  "python loops click focus quiet late arrays approve issues; prose typing what",
  "profile tiny gains bends control! type: hides",
  "without leaks java accuracy hides its arrive experts bringing near focus often what",
  "python care; prevents control saves focus jokes with arrive show sets use jokes paste",
  "among version clean copy focus speed fade care copy",
  "tiny demands show optimize quickly requests java prose quickly keyboards? silent? well",
  "monkeys optimize and among when. prevents code experts focus naming into tiny",
  "syntax deliberate finally weary bugs tools when issues forgotten",
  "quiet pieces sets them like projects bugs",
  "better for clean tools wars among in quiet will know tiny will sets",
  "review code on on; mornings features maps",
  "during night rhythm grow measure every will day chaotic code consistency pieces sets",
  "for overflow prose better forgotten tiny every review sets wpm objects",
  "once near grow stack pull like future teammates, tricky good memory syntax hides hides",
  "own in requests during show version with on",
  "coders pull fast: lists reads sets wars in accuracy what breathing tiny projects; stack",
  "click memory release errors them without future intensity intensity your without focus latency quiet",
  "syntax maps approve tiny tiny experts tested. for care own paste",
  "confusion experts demands but rhythm but wpm",
  "arrays better demands naming into overflow debug review: with version into! stack",
  "click requests jumps intensity! patience? wars pieces",
  "better sets weary tricky! good; requests",
  "errors focus kindly ship tested! clack quiet? debug",
  "leaks ship reads. bends for often projects",
  "leaks prevents features breathing click jumps; maps compilers future fast",
  "quickly tested chaotic bends coffee good future run tools leaks into what",
  "memory pull focus every on accuracy bringing experts minutes maps profile near",
  "typing coffee latency clean! ship. stack",
  "stack weary click profile issues coffee into java developers code java",
  "away profile fast but confusion fade latency both: arrays",
  "spread prose typing on. jokes will wpm gains coders syntax, during monkeys",
  "confusion into will matters arrays fast in forgotten tested; tested finally like away",
  "speed accuracy paste! developers; tested speed into compilers",
  "quiet then forgotten syntax. ten what quiet- consistency references clean requests latency",
  "copy quiet sunrise naming fade finally minutes care calm vanish both! gains; intent",
  "for objects? tools tricky fast the prevents both maps pull focus",
  "up requests when paste into- saves them",
  "own typing bringing run to better like! sunrise lists breathing kindly: developers when optimize",
  "without accuracy quickly spread debug paste for jumps",
  "vanish into near hides future pull wpm without jumps accuracy. well",
  "latency stack among, focus ship. intent speed what your deliberate monkeys",
  "breaking and ship references features prevents into reads for python developers minutes hides: often",
  "every control features! prevents tools: syntax review",
  "issues know focus beats chaotic tools tiny monkeys review measure before",
  "measure pull stack! paste intensity! with",
  "care wars tiny objects click the from bends coders tested saves big them: developers",
  "monkeys hides wpm? sets approve deliberate speed for from: measure sunrise bends",
  "build review. up what on shine focus copy shine better",
  "every profile click approve kindly whispers version with debug minutes prose teammates version lists",
  "day beats without. patience use day, bugs",
  "bends but paste consistency consistency minutes",
  "bugs profile and clack tricky saves focus review coffee",
  "kindly the big without know practice click day gains jokes",
  "mornings own for. keyboards coffee run- up up stack when night leaks future",
  "features into bends: good paste often",
  "in gains prose click for from teammates",
  "lists use arrays code:. accuracy run profile version naming when demands",
  "during demands better show mornings weary forgotten ship lists refactor tiny during code its",
  "quickly issues, overflow objects syntax: syntax requests use finally quiet",
  "java when future them among version profile clean: objects java up",
  "wars release shine to tricky; to",
  "stack care accuracy coffee minutes practice calm into bringing show",
  "quickly on beats use prose- errors code among when minutes patience jokes memory",
  "demands intensity fast accuracy focus: once bends near, better code often",
  "version measure memory wars better them features well bugs but",
  "the breathing shine arrive developers java minutes",
  "copy refactor; spread once in tricky up wpm pull debug prose approve away",
  "ten compilers quiet among clack on type intensity references better accuracy naming? objects! both",
  "quiet stack release experts pull code",
  "your know confusion silent type practice your requests hides in? without",
  "know when vanish release on: maps quiet is features? quiet with weary arrive",
  "grow during; naming: developers care teammates",
  "late code tricky good away when typing tricky clean maps care",
  "without tested intent accuracy, refactor reads hides",
  "measure monkeys- type reads know chaotic- compilers",
  "to weary code day. optimize before calm",
  "with wpm ship future measure grow requests wars- on, mornings",
  "bends breaking review kindly hides night maps issues care objects speed debug, paste without",
  "focus stack version intent practice like ship sunrise rhythm coffee deliberate is code wars",
  "what type; stack grow late naming optimize finally control kindly clack when",
  "breathing quickly weary minutes. projects speed prose- matters typing away debug clean python mornings",
  "with keyboards minutes chaotic kindly fast overflow: away deliberate: once care weary in paste",
  "wpm hides care clean: quiet profile",
  "the own during. matters code! when from copy sunrise typing on speed quiet",
  "gains practice control mornings fade experts. gains speed, keyboards control python maps arrive",
  "day tiny spread paste requests clean refactor know? python bringing: reads deliberate",
  "latency big coffee saves wpm bends; saves accuracy stack control",
  "code version silent release coders: memory on intent minutes the requests its",
  "before loops; optimize future grow overflow python",
  "its whispers wars breathing? matters code consistency sunrise keyboards",
  "care focus near wpm debug; and for projects pull every hides practice",
  "typing own run late near errors speed consistency both use",
  "breaking know into; confusion your shine",
  "during to use loops accuracy bugs its every better ten pull show",
  "stack forgotten big pieces; typing clean calm. minutes is",
  "good tricky issues then? coders. loops focus matters intensity before chaotic minutes",
  "every from bends release ship with, run; mornings finally",
  "requests compilers overflow prose overflow kindly code on measure beats near grow",
  "is calm will tested copy near jokes silent tiny then quiet overflow",
  "bringing projects: release code coders tested sunrise into keyboards java spread focus",
  "own breaking gains profile typing good compilers when",
  "to deliberate bends chaotic every patience overflow",
  "better intent away and into stack java day spread practice will rhythm pull",
  "near type approve python finally projects control what speed intent bugs release intensity matters",
  "wars your clack! tiny saves both teammates rhythm experts saves when",
  "paste future is vanish reads debug hides",
  "debug well own saves? mornings gains",
  "into before them optimize; jumps sunrise",
  "intensity release consistency python, tested: breaking when",
  "refactor forgotten big care future, debug",
  "breathing intensity from experts teammates! maps fade maps monkeys during mornings its up",
  "what once monkeys future overflow python run stack",
  "objects coders vanish objects, run once will hides memory quiet release demands wpm",
  "without prevents keyboards focus click saves near- code pieces among future monkeys deliberate ship",
  "quiet once calm into coffee? jumps",
  "monkeys quickly? intent? every objects stack well measure jumps approve",
  "rhythm your arrive control. into deliberate focus ten intent minutes vanish the coffee know",
  "approve patience fast well care.! tools",
  "patience profile projects finally whispers: breaking requests ten and compilers measure ship",
  "ship speed focus? mornings weary know confusion will",
  "typing release build lists; own when, forgotten projects leaks arrive click syntax java your",
  "objects on paste monkeys mornings teammates python? keyboards maps: memory breathing reads chaotic",
  "focus copy tested wpm good show, consistency compilers loops better",
  "often fast run code matters. when with patience will syntax near then",
  "accuracy during stack code refactor reads show pull",
  "show control! tested before once minutes from tested: accuracy bringing jokes objects",
  "paste on release: intensity approve what prose clean bugs often. compilers review chaotic",
  "references code: kindly keyboards experts will click pieces",
  "errors big optimize references when developers breathing quickly, pieces requests care",
  "monkeys focus confusion copy- ten speed bugs lists paste",
  "issues mornings- stack? deliberate clean use focus release",
  "calm measure kindly ship click version typing",
  "them projects- leaks paste the spread minutes up experts features with",
  "good minutes spread ten optimize big intensity late",
  "ten every show rhythm rhythm demands clack keyboards will requests show",
  "your ten hides them version jumps silent patience; tricky! bringing beats among",
  "forgotten type syntax late sunrise patience maps away speed focus projects your. use",
  "near own release prevents sunrise teammates",
  "weary arrive developers in python shine errors hides vanish click- overflow",
  "bends for: ship care big run near quickly maps jokes errors profile",
  "code prose night features know night well code accuracy night rhythm to them",
  "tools calm calm saves review- show teammates tested into vanish care optimize once",
  "its before review when but- arrive, debug speed tiny weary",
  "once gains latency developers intent, its",
  "own ten better gains spread, requests and",
  "compilers tools silent tools pull without: approve",
  "requests maps build them? refactor leaks- latency hides",
  "every review forgotten will jokes tools python during objects loops",
  "experts fast spread tricky! wars monkeys both. without and calm show own",
  "shine click naming copy consistency developers night",
  "bugs bugs what vanish your: own pull",
  "sets will click care like paste among keyboards code bugs wars and",
  "pieces memory the your leaks practice objects tested ship requests arrays: coffee from",
  "optimize to features like speed forgotten breathing? bringing but profile bends tested? clean",
  "into teammates. them code? ship click",
  "them minutes monkeys. care clack your consistency among wpm wars shine release, and python",
  "quiet before bends use minutes chaotic- errors focus- quickly calm your breathing",
  "vanish objects click bringing! consistency fade mornings but",
  "consistency night features. release rhythm approve",
  "patience keyboards prevents fast often! pull practice late intensity",
  "maps objects copy intent experts coffee loops ten day hides",
  "review version reads matters experts with chaotic fade developers them",
  "stack calm up then pull refactor saves practice wars: weary will",
  "approve well prevents; release fade python day big, for",
  "jokes the and objects and use show ten big sunrise late from",
  "then when gains bringing teammates experts big",
  "without once good your coders them breathing beats! java jumps; errors java",
  "prevents speed care- copy saves! whispers clean focus gains intent intensity pull",
  "version click saves pieces features both away will intent? finally monkeys to projects code",
  "memory tested and! late like? typing",
  "to for ship forgotten: errors- build hides approve",
  "every once prevents late wars demands show build approve syntax calm! for",
  "whispers lists rhythm breaking for arrive accuracy matters",
  "your hides references! but control pieces into debug",
  "when sunrise keyboards coders intensity calm jumps sets during deliberate measure forgotten shine",
  "without accuracy big- debug before! on when paste",
  "naming projects your deliberate jokes sunrise future will requests- hides coffee every",
  "silent typing on weary when:- wpm care",
  "whispers naming spread run- when late",
  "day latency the arrays sets what care ship when once what tools minutes tiny",
  "ship optimize jokes pieces when hides",
  "keyboards ten chaotic- practice good speed sets",
  "type minutes clean copy? breaking day",
  "consistency calm! on, before monkeys matters",
  "naming saves: own into copy: optimize typing future know refactor your",
  "run pieces: with paste them typing night",
  "grow mornings! late with features matters",
  "then code requests: prose your tools jumps pull: often code",
  "control consistency- compilers for tested monkeys will into requests leaks maps silent stack wpm",
  "when once chaotic coffee wars;: during",
  "before big like references? focus keyboards clack confusion; then beats",
  "shine build- among shine night build like its intent code clack loops",
  "for what leaks experts better gains clean lists care. compilers own",
  "prevents forgotten away practice- jokes! your kindly vanish",
  "java projects naming ten focus arrays with jokes into profile",
  "both prevents:- whispers copy matters weary teammates future speed arrive patience",
  "what ten on sunrise code then release consistency maps pull; near both",
  "mornings fast like., syntax approve coffee into grow coffee prevents sunrise projects",
  "loops sunrise naming from its is monkeys gains near",
  "pull speed click lists. show confusion",
  "day profile its developers tested refactor care coders with when with",
  "gains matters what features will build pull optimize",
  "experts minutes to, grow type accuracy weary. consistency syntax",
  "spread near debug and overflow quickly type stack quiet but",
  "pull code build syntax before; paste: tools",
  "wars minutes breaking projects- minutes experts demands",
  "keyboards java patience prose both into? but focus wars",
  "measure whispers then release deliberate before both arrive mornings into own teammates spread",
  "measure big from monkeys tools both finally naming",
  "measure show day spread rhythm mornings show then features: tools well- bringing speed approve",
  "tested focus near- optimize issues ten python? lists ship quiet latency",
  "lists future but! every compilers breathing keyboards debug errors silent them accuracy",
  "lists gains deliberate consistency whispers monkeys well optimize clean use",
  "control night jumps projects intent; mornings, and",
  "away every then arrays: references accuracy, what",
  "patience rhythm memory:, coders them keyboards",
  "big requests care ten breaking: without",
  "forgotten but night with finally pieces",
  "tiny consistency when without syntax: errors reads features every",
  "typing beats wpm arrive experts and; python run loops; intensity spread",
  "forgotten references arrays run teammates quiet.; before without when",
  "features clean arrive breaking requests arrays! accuracy",
  "good rhythm forgotten them ten often wars near",
  "the fade coders from jokes; spread its tricky shine approve refactor! with issues",
  "memory with stack tools sunrise teammates mornings ten",
  "jokes care syntax ten. wpm issues big breaking pull intent among",
  "the code features arrive errors from focus approve into then own",
  "intent big coffee arrays like gains",
  "projects keyboards beats build. fade lists memory accuracy typing run for stack whispers",
  "sets to code stack during but will use review bends release",
  "keyboards arrays fade issues then prevents, lists features control focus the",
  "shine tools use bugs. quiet stack in",
  "copy code gains night saves ten deliberate prevents confusion references",
  "is well both know weary references day: teammates near but. breaking",
  "monkeys developers practice, use memory often monkeys better big arrive during grow future vanish",
  "references matters shine with issues profile. stack",
  "paste intensity but arrive vanish lists clean features projects near then compilers",
  "arrive tested breathing type; rhythm breathing",
  "big among version among vanish paste",
  "future whispers tested errors bringing reads gains will",
  "coffee saves tricky for prevents confusion the objects maps but python review when: objects",
  "confusion them. overflow; compilers practice well matters",
  "pull reads wars: sunrise quickly stack lists maps compilers fade: typing prose",
  "fade tested version paste references accuracy then code coffee clack profile into? code",
  "beats projects; well well weary refactor know clack- run finally for wars",
  "accuracy jumps every issues big coffee wpm every arrive own python deliberate tested rhythm",
  "loops weary matters projects: memory? better ship",
  "bringing intent use ship deliberate maps overflow finally well beats experts",
  "show arrays focus stack arrive sunrise",
  "pieces shine. good version during with gains",
  "kindly lists references shine and review",
  "coffee up during ten chaotic compilers quiet your wars night consistency",
  "to experts; bugs java memory patience tested! from better vanish references",
  "coders profile hides naming the forgotten? for coders what consistency tiny to sets",
  "keyboards profile version its care every",
  "spread syntax projects overflow- reads from clack features- patience java reads tools quiet minutes",
  "tools debug wars developers. errors clean deliberate use kindly sunrise finally fade memory",
  "care type errors features monkeys code minutes for monkeys copy profile ship",
  "wars click jumps approve silent intent when coffee",
  "bringing calm vanish? on coffee references developers jokes",
  "latency to late syntax! breaking know! whispers pull stack among",
  "focus prose deliberate reads among good deliberate from fade jokes away! tricky type saves",
  "compilers arrays speed clack late from. leaks references? coders leaks day but debug",
  "patience better arrays good when code often leaks latency code- near before! jumps",
  "the during into in silent pieces bringing tools fade demands control!- breaking approve chaotic",
  "clack hides pull tools syntax among grow bugs forgotten",
  "gains bringing when consistency speed coders references experts coffee? bringing without debug",
  "weary tiny consistency forgotten. jokes reads errors coffee know type",
  "deliberate rhythm features use requests silent kindly. deliberate tiny",
  "patience its into every tiny type kindly spread sunrise typing",
  "whispers near breaking tiny late projects ten coffee",
  "arrive day overflow sunrise weary. grow run: copy",
  "bends them requests is often developers review python during intent kindly python features",
  "fade memory coders them consistency clean keyboards compilers stack; lists well review? errors show",
  "jumps wpm objects hides finally debug gains quiet into profile",
  "issues good into leaks- bends and weary references away grow bugs when like",
  "python bringing optimize day focus- its tools release",
  "mornings experts good silent finally, your monkeys saves",
  "and projects them from typing them",
  "weary accuracy ship maps chaotic kindly control deliberate clean jokes saves developers?: good",
  "run optimize among when shine type future: grow for",
  "overflow calm. vanish python quiet references jokes future",
  "ten copy ten release both. lists, from practice",
  "on matters profile when well code loops; to breathing? python",
  "review clean up when stack: good",
  "well silent measure both: bringing vanish to near without big",
  "from what refactor quiet ten review into know know version intent coders",
  "every coffee among python fast keyboards big with ten will your coders",
  "better to without bends then typing kindly and every but clean speed once on",
  "review silent sunrise hides beats bringing tricky",
  "deliberate focus quickly kindly: arrays confusion intensity code loops both syntax jokes",
  "and future? monkeys review focus pull copy near",
  "speed saves overflow tools syntax will control mornings them coders! in",
  "rhythm latency like sets wpm coffee tricky sunrise fade. the",
  "when consistency leaks? big copy measure rhythm measure for, build review references leaks with",
  "accuracy developers coffee; like ten run- hides finally keyboards",
  "refactor hides arrive and calm stack python what own- bringing",
  "leaks optimize- overflow, clack into good",
  "to its bringing them arrive quickly finally, then",
  "grow beats paste ship demands shine experts care code tricky",
  "will type quickly future: jumps! clean arrive type forgotten",
  "measure profile optimize wars intensity control! quickly gains chaotic will requests",
  "breaking coders pull. both gains! and on without lists",
  "care deliberate intensity memory accuracy clack",
  "on coders practice? issues beats sets type refactor sets monkeys code ten- loops",
  "will when matters care sunrise, before ship on",
  "day measure copy good focus big refactor accuracy syntax beats syntax",
  "projects requests care memory quiet well arrays wpm away: kindly away pieces build jumps",
  "intent code to beats quickly good debug better: wpm review tricky",
  "near rhythm, ten bugs maps well",
  "tools syntax late click ten build practice, optimize: bringing code version",
  "bringing syntax debug patience developers, bringing practice run stack gains consistency pieces",
  "mornings leaks! chaotic build when- focus",
  "keyboards breaking intensity practice quickly? coders fade references tricky typing once is",
  "bugs on, demands release clean well into latency loops requests shine",
  "control when away calm late review",
  "speed vanish the from debug with minutes compilers errors maps pull leaks coffee jokes",
  "code its consistency measure version beats? speed accuracy",
  "every better kindly fast? naming teammates pieces",
  "will objects pull from? both what care kindly, arrive clack",
  "tricky review night among during pieces python experts often sets wpm reads big tiny",
  "consistency approve fast confusion? demands; but know maps consistency reads focus saves",
  "use release ten ten know both copy monkeys accuracy arrive paste? mornings",
  "release sets intensity run gains jumps coffee; into",
  "typing run breaking: future on monkeys whispers silent the the stack quickly",
  "whispers know up developers when version: sets: copy refactor your breathing breathing profile",
  "for hides hides good breathing kindly fade forgotten",
  "and leaks arrive once is loops jumps; big",
  "deliberate future errors tiny care often! jumps stack care know wpm",
  "paste is coffee both calm care deliberate better- sunrise",
  "control kindly coffee requests focus type review",
  "matters forgotten errors release. both objects reads monkeys will click release own every",
  "near your?- then prose into quickly",
  "arrive stack bugs minutes loops shine accuracy naming fast requests? finally rhythm day",
  "care to leaks monkeys errors whispers leaks. what click hides",
  "intensity click practice references well control intent beats confusion sunrise night",
  "without calm projects wars wpm, code better before arrive, measure rhythm in during",
  "chaotic errors version review: intent wars but deliberate ship objects",
  "and accuracy latency bugs naming tools pieces? without sets away",
  "version wars syntax profile wpm- whispers? issues monkeys matters fade bends matters breathing",
  "away weary! run errors optimize developers build before",
  "speed paste without weary wpm on leaks practice approve",
  "latency stack syntax keyboards coffee jokes ten weary quickly intent focus own clack",
  "projects night version show code to release",
  "then vanish well review- spread forgotten consistency day experts",
  "care tricky issues once; prose with; leaks pieces spread",
  "python big then from every fade silent the experts beats stack tiny future python",
  "tiny care wpm. pull developers code: features",
  "loops breaking day- day memory use but- naming code monkeys refactor python whispers matters",
  "minutes is wars jokes consistency prevents leaks",
  "references developers coffee. wpm away references to. whispers among",
  "chaotic python your once demands during wars sets loops control vanish like syntax objects",
  "jumps arrays arrive pieces speed the breathing whispers prevents fade its click spread, control",
  "when errors with prevents quiet for well- click",
  "overflow speed rhythm late late optimize beats them keyboards kindly calm",
  "syntax often references projects bringing gains care- big into better know during issues spread",
  "deliberate features silent reads but grow, version its stack jokes your forgotten",
  "speed profile silent matters grow debug for tricky quickly pieces",
  "gains prose hides build consistency review beats references compilers fade.! like finally",
  "projects whispers the fade fast projects build wars into run",
  "clean day tools sunrise compilers them breathing compilers away but naming",
  "wars spread experts- up release. kindly",
  "intent matters intensity know tricky typing loops- confusion: when pieces",
  "quiet approve optimize often prevents! review beats loops bends issues late for bringing",
  "once lists compilers keyboards jokes ship errors day review saves matters",
  "good stack reads minutes speed quickly",
  "before experts experts arrays weary lists tiny arrays matters",
  "with features away late intensity, intent overflow without build syntax when breaking with",
  "mornings click once your demands into coffee its better every deliberate fade",
  "python grow will away use; jokes pieces jokes",
  "arrays projects paste objects wars wars practice into: code measure care its teammates control",
  "prevents shine intensity! stack often day both the",
  "release speed good before click? features in; care",
  "then reads coffee use mornings matters good mornings good; references when but",
  "refactor lists monkeys up into good latency",
  "from prevents loops use fade from stack own",
  "jokes projects weary and sets in errors, before bends prose",
  "then bends near from. often- fast and",
  "hides java-. care future will saves in measure experts",
  "type measure among then arrays naming? build",
  "fade projects type monkeys? coders better into teammates",
  "arrive tools once breaking!; demands to",
  "java better like compilers during night without when its lists every code once bends",
  "reads often bends future when into forgotten for refactor paste before use teammates",
  "every compilers calm patience is., often into",
  "developers practice into well measure leaks type quickly vanish is big beats developers prevents",
  "intent version approve? but mornings into bringing in, to measure the leaks grow during",
  "whispers reads future silent latency matters know click focus. reads. from from practice",
  "every typing show naming better then rhythm know once",
  "intent clean among! issues wpm during. what code requests optimize patience focus issues",
  "issues among? forgotten, hides compilers every quickly",
  "matters and requests run like them mornings among ten",
  "breathing issues code day will matters into projects pieces finally ship weary into",
  "good coders- what both what chaotic from clean",
  "on stack keyboards tested to!. in matters naming",
  "intent when pieces its hides but",
  "tested prose shine during practice reads deliberate keyboards hides",
  "like into with bugs minutes syntax sunrise stack",
  "paste rhythm into latency maps when calm paste developers developers build",
  "typing bringing features among build often forgotten errors java bringing wpm like approve",
  "good review know every into big java future like what issues? arrive pull",
  "practice prevents; then finally code consistency your know near big features- intent gains",
  "into before hides pull its compilers, prevents mornings! fast beats them",
  "forgotten when coders speed! sunrise big deliberate",
  "click java beats often whispers care projects during; leaks",
  "often care quiet spread often version good, bends care to; calm python approve tested",
  "debug is release calm python every:: is",
  "objects sunrise the both ship requests breathing coders consistency",
  "jumps leaks once run optimize java objects control stack code care overflow own once",
  "calm demands objects confusion near breathing rhythm up prevents tested when rhythm once python",
  "coders sunrise well. compilers ten and minutes what good finally without errors to care",
  "requests future during care during use care type calm objects",
  "compilers rhythm fade quickly once features click naming objects. chaotic coffee well control",
  "type compilers build bends your sunrise, from",
  "prose but prevents but focus clean",
  "during objects use quickly tools rhythm bugs chaotic consistency! in beats spread",
  "keyboards pieces but breaking up; clean shine latency with- for in whispers",
  "typing naming- into without; run minutes late fast clean teammates night",
  "rhythm copy breathing! experts what when requests objects",
  "syntax jokes forgotten memory silent up tiny",
  "debug pieces during optimize during lists; typing use once practice run",
  "refactor to release good copy away your mornings",
  "speed confusion better bringing overflow? java",
  "python release: tested bringing finally prose type approve spread typing ten syntax",
  "teammates its wars- like during spread pull finally coffee quickly whispers silent",
  "prevents stack. prose, every build near",
  "calm up use vanish rhythm kindly reads away",
  "care intent bringing approve quiet into? compilers objects loops near into",
  "experts your show arrive syntax stack confusion loops stack sets maps? bringing requests",
  "finally shine good teammates? deliberate optimize focus tricky quickly naming up; fast",
  "overflow run when weary profile references java breathing well",
  "bringing day ten typing ten reads speed lists memory copy fade jumps late",
  "focus vanish- but fade forgotten kindly! tools references bugs big",
  "pieces better in away python ship wars sunrise focus patience",
  "experts maps patience; better projects prevents practice what from requests pieces night demands prevents",
  "and during wpm stack fade clack care quiet demands? better stack practice quickly and",
  "often control! use night wars rhythm ship prose compilers",
  "kindly demands big gains future often paste java both accuracy sets control chaotic rhythm",
  "saves every its: chaotic release teammates accuracy approve tested",
  "into coffee code build weary hides- code tiny",
  "jumps is stack objects code in arrive for show",
  "maps minutes prevents better optimize run; jokes kindly often",
  "weary show. pieces java maps day release the focus finally build. but",
  "references beats pull memory objects forgotten focus once good version before forgotten maps sets",
  "rhythm know rhythm into latency developers click when errors features to fade up",
  "mornings to tricky for day pull typing leaks ten arrive pieces loops! quickly wars",
  "teammates big clean? lists errors? to to prose measure overflow then when",
  "better ship? bringing code better jumps errors: developers release",
  "clean click jokes wars without arrays spread",
  "focus coffee once shine stack latency version mornings intensity: better prevents, saves developers",
  "type show its what among. coders arrive accuracy intensity: often",
  "coders copy! jumps projects bringing, arrive",
  "leaks once vanish arrays know before. near confusion, kindly",
  "hides lists intent profile consistency profile your grow grow monkeys maps",
  "consistency focus build ship forgotten! stack day approve projects",
  "well minutes kindly optimize experts bringing its release with the optimize focus",
  "requests paste prevents hides then latency measure both stack rhythm minutes",
  "hides tricky well naming errors wars jokes spread",
  "features clean maps stack before; but for",
  "stack sets often bugs review tiny",
  "kindly measure? issues release sunrise arrive objects vanish tricky loops",
  "to version, to during projects whispers focus show beats, debug click naming whispers optimize",
  "loops breaking up prevents projects paste well what better run will deliberate",
  "is arrive quiet minutes chaotic matters calm code is what, matters day",
  "deliberate maps well prose care click tricky every well",
  "sets leaks refactor will gains accuracy bringing before release: developers",
  "optimize pieces whispers keyboards click care practice arrive mornings",
  "before click quickly saves them prose arrays but breathing keyboards sets",
  "monkeys vanish code- during before compilers among",
  "copy profile big breaking experts vanish; bringing sunrise run optimize refactor confusion",
  "typing leaks build minutes but prevents release stack deliberate when weary with tools",
  "version mornings! debug into naming; run copy",
  "stack profile calm into? up from typing",
  "for for the. before code: pieces",
  "copy vanish finally grow memory click",
  "but keyboards will care into demands optimize tested python developers measure",
  "pieces every. bringing sunrise night objects code, references",
  "breaking optimize pull release reads care but! features patience wpm overflow will sets",
  "errors demands loops hides big own measure saves version minutes breathing run",
  "profile speed run night and? speed",
  "python will better spread version; the them night",
  "reads near lists maps compilers issues to know but both issues leaks",
  "saves errors release away vanish will to pull requests is syntax tricky wpm care",
  "focus sets what clack tools. control practice quickly accuracy what from quiet care fast",
  "sets references the! loops reads shine focus ten bringing finally",
  "once future clean calm practice often whispers prose its future",
  "finally optimize good;; deliberate typing chaotic",
  "leaks code what intensity developers. night",
  "mornings clean prevents intensity fade monkeys focus? java maps copy syntax to the",
  "fade accuracy to;. stack well experts",
  "experts copy tricky day silent among click",
  "its overflow errors control intensity quickly intensity sets refactor",
  "minutes latency own know often rhythm shine features",
  "features show every copy prevents; shine deliberate: away own syntax",
  "sunrise deliberate finally optimize python? intensity",
  "silent compilers use prose type?- clack breathing breathing clean mornings stack night",
  "practice tiny your coders, both leaks future fast",
  "both experts use fast memory; mornings confusion issues",
  "bugs teammates arrays python coders references consistency refactor spread accuracy during among know",
  "mornings minutes sets during: arrays compilers accuracy bugs consistency type kindly",
  "sunrise big keyboards developers prevents then arrive rhythm",
  "night late your night rhythm bends without projects: debug patience every the. focus bringing",
  "latency own jumps tiny? sets jumps saves. requests when version prose deliberate coders loops",
  "developers memory ship references then control to arrive,, its care beats issues",
  "like minutes, typing use shine show wpm. them jumps bends errors",
  "weary intent without! use; better late experts tricky matters",
  "gains breathing in when care latency hides: practice",
  "lists typing projects teammates breathing memory bends near bends vanish! stack quiet",
  "among refactor: code maps requests chaotic sets. spread control run optimize type",
  "pieces breathing weary demands review paste big without loops use but code",
  "code late;. maps rhythm silent leaks",
  "with bringing gains: to to whispers. reads",
  "what grow weary quickly review to for prevents",
  "code coffee? saves. jumps optimize latency",
  "its night profile. pieces requests use wpm",
  "its every- coffee clack late; deliberate",
  "then them- paste prevents own? demands developers like bugs",
  "java wpm big in on tricky late. with review bugs pull features",
  "quiet typing better accuracy python forgotten type tiny saves teammates spread away focus release",
  "tiny quiet tools refactor compilers overflow approve but",
  "then release wpm errors its typing; finally like during. sets weary features into",
  "measure bugs breaking- quiet finally patience prose bends intensity review requests",
  "is arrays forgotten arrive breathing well java! copy when- naming overflow them typing vanish",
  "accuracy wpm build reads them matters both what the tricky its your tested",
  "minutes naming ten often quiet tools! once",
  "future bugs on often use- ten refactor its bends demands leaks know on both",
  "gains teammates night compilers good will kindly when: gains pieces up latency",
  "well features release memory syntax refactor issues for keyboards. big pieces beats",
  "pieces speed vanish late overflow keyboards objects wpm: compilers teammates- them will",
  "often like:? speed paste when vanish projects the leaks overflow",
  "better what release finally whispers control chaotic show coders chaotic matters fade",
  "references both lists keyboards! copy. pieces lists",
  "breathing release reads night grow then arrive intensity. objects tools breaking jokes pull",
  "once matters before silent errors? every breaking will clack fade during ten clack fast",
  "away experts features: vanish build release profile know show spread build click",
  "ship quickly care bugs own prevents",
  "mornings into copy- stack, lists into",
  "copy coders latency syntax from what into run chaotic ship the? measure maps",
  "release is: typing in then objects fade but away in references pull without wars",
  "compilers kindly spread better quickly intensity build, refactor own among control",
  "chaotic review demands.; kindly and once",
  "care the; code tested rhythm hides consistency late",
  "focus click! sets stack sunrise stack patience ten. breathing compilers among reads copy",
  "run matters breathing will care! mornings its run- speed",
  "wars late! what among: profile whispers for overflow rhythm errors overflow focus",
  "into consistency patience quiet both latency your requests focus optimize; references run; without",
  "paste your chaotic latency control quickly debug calm breathing copy",
  "stack late intensity the code jokes good forgotten",
  "maps on good in code whispers intensity in pieces approve typing",
  "maps click debug show syntax intensity features copy loops breaking latency, the java features",
  "late kindly like, ten loops copy. like",
  "teammates measure both vanish sunrise once quiet pieces with know quickly kindly",
  "the fast overflow review approve profile",
  "experts show intensity spread type latency",
  "saves when before objects bugs up hides focus fade future day sunrise intent",
  "when reads shine care tricky sunrise. chaotic bringing reads gains control",
  "arrive mornings leaks python naming latency during; rhythm deliberate will maps intensity stack",
  "requests into quickly? bringing when clean into into",
  "latency up ten into gains hides both breaking sets monkeys- is",
  "code build mornings with consistency patience clean its: patience: speed",
  "jokes breathing features late; code! bends",
  "what focus breaking forgotten speed overflow arrive latency night memory your like",
  "refactor will syntax tiny. speed among the spread rhythm when",
  "refactor naming confusion breaking stack well! weary",
  "objects code review: during prose developers and",
  "quiet syntax arrays monkeys approve mornings ten into know- debug",
  "sunrise profile maps its gains copy coders! bringing stack, focus vanish future",
  "and breathing mornings near coffee, references chaotic",
  "fast grow prose own java arrays then minutes fade: coders",
  "from minutes like prevents deliberate errors review practice to day java- intent gains focus",
  "on spread once like compilers tricky- maps like will rhythm quickly up",
  "click breaking syntax memory! compilers. finally",
  "but coffee code kindly! review use, code",
  "tools tested vanish rhythm teammates during pull projects forgotten control big",
  "projects optimize code once pieces arrays references consistency type mornings prevents",
  "then spread show into during clean wpm spread",
  "compilers tested silent speed chaotic references forgotten prevents into grow clack? sets- accuracy consistency",
  "when optimize shine tested syntax demands maps and finally; features run build objects type",
  "maps up when features. breathing future hides java show memory kindly minutes its, release",
  "debug consistency hides lists errors references build projects profile breathing when",
  "late grow spread demands tested experts version! care prevents",
  "the maps python jokes! practice latency build keyboards tricky",
  "big for its spread focus day prose! compilers fast whispers code often. big",
  "up monkeys overflow code consistency fast with",
  "code both show away coffee shine latency beats breathing references tricky good whispers",
  "requests measure fade latency chaotic better java coffee clean typing beats",
  "run python silent, code developers issues",
  "release clack arrive pull:: click jumps chaotic into debug pull often fade projects",
  "is mornings intensity? rhythm: from on sets grow deliberate",
  "show day! compilers; like hides wpm java",
  "when shine consistency its mornings future will maps code pieces; use",
  "speed issues care debug is loops will know review",
  "before tiny typing prose and python arrive java keyboards wpm near",
  "without issues away like speed objects to- often gains compilers wpm version",
  "tools leaks beats wpm ten deliberate big to hides lists",
  "focus shine often night- big fade stack! know vanish care intensity once developers",
  "away code but reads tiny stack, clean coffee",
  "experts among experts to compilers ten",
  "click with sunrise: objects the issues teammates. finally into clack forgotten prevents stack",
  "good near jumps with tools, reads bends objects day its: like",
  "whispers when focus tricky review on intent pieces control.- like coffee",
  "its show; arrive confusion overflow reads. up syntax",
  "breaking before from vanish breaking speed well-? once future once every typing errors pull",
  "care objects accuracy near clack every copy speed into requests",
  "well type bringing- naming vanish matters confusion before. wars",
  "experts good gains rhythm know features night java its maps paste tested late them",
  "use quickly clean! well memory run focus shine",
  "spread future often among bringing latency measure chaotic clack click fade",
  "hides show them: pieces features own big",
  "jumps minutes, day saves saves memory future profile",
  "prose show: deliberate bugs references fast whispers its? projects wpm forgotten whispers",
  "type before silent silent is and; rhythm good practice when up",
  "demands version- weary profile finally and fast stack type kindly",
  "kindly care typing quiet refactor profile focus its night lists errors code",
  "pieces stack saves profile; on? stack before and",
  "version day leaks code prose! wars- fast overflow profile patience",
  "matters often consistency but own! pieces",
  "references day bringing sets them near: prose",
  "approve hides jumps copy: sets- optimize them jumps is python fade demands issues",
  "release but: clean when matters sunrise big forgotten",
  "hides late? memory fast maps well ten into developers vanish vanish coders",
  "without ship overflow quiet! requests naming show naming into",
  "version intensity? intent optimize, refactor for approve pull care typing",
  "own ten references wpm its big features objects keyboards",
  "late focus build pieces beats debug fast jokes quickly up release",
  "version well! pieces when measure jumps. click projects prevents saves java when version",
  "both once vanish like own debug whispers then focus- experts clean",
  "control review deliberate issues care copy kindly know minutes arrive",
  "day coders, vanish will. focus keyboards use what pieces during intensity",
  "wars bugs use measure java saves references memory deliberate with python approve keyboards demands",
  "silent pieces issues use- sunrise: arrive naming chaotic stack",
  "and in in stack; wpm jumps",
  "but whispers up and jumps good mornings projects saves your",
  "without then, sunrise profile wars to confusion pieces! your accuracy speed",
  "clack its overflow better keyboards leaks paste bends then",
  "arrays breathing matters day what minutes arrays, run breathing",
  "into copy when quickly hides well; developers beats copy. late",
  "experts latency java? from. intensity late release",
  "python release once care overflow shine up sunrise good care; debug",
  "optimize release coffee patience intent what to",
  "whispers reads keyboards grow prose requests",
  "without debug intent silent day reads- version: type bends prevents day beats profile calm",
  "show copy type whispers them grow: day stack",
  "optimize bugs focus monkeys well coffee latency intent copy intent paste bugs",
  "arrive developers lists minutes errors lists during review before quickly java quiet during bugs",
  "typing wars deliberate when: memory type once is coders your",
  "version type into projects ten speed; use into bugs ten",
  "optimize calm click;? the jumps developers stack use to",
  "matters sets debug.. breathing loops often",
  "prevents ship to! accuracy but, into version lists gains into",
  "care spread what breaking chaotic into. stack",
  "up near refactor, before quiet lists when debug accuracy accuracy on and future late",
  "big consistency focus compilers own quiet copy python in release both",
  "run saves click arrive for deliberate paste and use before developers use! control",
  "leaks tiny matters! version among kindly. future demands",
  "clean to weary! run quickly jumps features kindly clack",
  "mornings know arrive code but away then approve among",
  "paste use and; maps run before pull",
  "quickly arrays gains arrive python intensity jumps night teammates version monkeys",
  "profile whispers ship projects silent leaks finally with both fade developers",
  "saves requests spread confusion- developers know",
  "from version away before keyboards issues java intent? near keyboards",
  "wars references prose, when overflow breathing from! approve coders",
  "keyboards know! near arrive among profile loops both issues developers weary? is hides demands",
  "references wars will late tricky keyboards profile know pull: tested quiet memory",
  "coders prose build? naming care, build tricky review",
  "developers approve! day monkeys- among clack",
  "tools focus compilers arrays paste day, to stack",
  "jumps during- references- away deliberate naming",
  "prose in stack lists wars fast: silent focus coffee spread but",
  "optimize version: tricky measure measure day shine pull",
  "bugs every in better will, hides control",
  "control on kindly every vanish whispers. approve gains minutes",
  "syntax coffee away latency! teammates lists will shine release paste with",
  "lists kindly among intensity near like pull loops- overflow objects breathing fade hides",
  "when developers kindly monkeys with bringing reads paste optimize",
  "bugs projects care, spread tested focus speed leaks; sets intent ship",
  "like away optimize accuracy, developers prevents clack! good issues care beats",
  "ship and tested teammates future matters late is focus focus refactor",
  "both demands arrive with maps keyboards bringing big",
  "your future to beats the day jumps on monkeys debug good run",
  "spread then errors late intent ship tricky lists",
  "jumps like up but care shine from before stack arrays hides maps",
  "away accuracy from focus keyboards its refactor? approve focus",
  "bends tools near from demands night confusion",
  "wpm features focus; review stack issues wars tricky; memory",
  "and matters shine wars clean prose python during breaking features mornings deliberate",
  "without overflow your stack bringing; silent mornings, when practice optimize",
  "know up click clean own. near sets code",
  "click sets review beats intent care know",
  "copy pieces overflow prevents! sunrise late quickly coffee code is copy fade maps; future",
  "arrays quiet practice well better focus tricky quickly good kindly",
  "deliberate shine for day good, finally syntax",
  "show control keyboards silent like rhythm; mornings coffee profile measure",
  "sets rhythm: in will rhythm keyboards! matters weary",
  "fade every copy your night errors lists",
  "once deliberate: know: practice focus its night",
  "and developers among pieces naming! and approve wars every shine fast finally",
  "stack focus vanish sunrise coders objects good what to clack",
  "clean naming projects objects silent, away when",
  "kindly loops experts latency matters away bugs measure java gains before",
  "shine the spread pull-, saves build jokes memory debug forgotten quickly"
  ];

  // ---------- elements ----------
  const app = document.getElementById('app');
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  const resultsView = document.getElementById('results');
  const timerSeg = document.getElementById('timerSeg');
  const typingEls = [canvas, document.getElementById('controls'), document.getElementById('hud')];
  const els = {
    wpm: document.getElementById('wpm'),
    acc: document.getElementById('acc'),
    time: document.getElementById('time'),
    wordCount: document.getElementById('wordCount'),
    timerBadge: document.getElementById('timerBadge'),
    restart: document.getElementById('restart'),
    newText: document.getElementById('newText'),
    shorter: document.getElementById('shorter'),
    longer: document.getElementById('longer'),
    custom: document.getElementById('custom'),
    overlay: document.getElementById('overlay'),
    customArea: document.getElementById('customArea'),
    cancelCustom: document.getElementById('cancelCustom'),
    useCustom: document.getElementById('useCustom'),
    // results
    resWpm: document.getElementById('resWpm'),
    resAcc: document.getElementById('resAcc'),
    resType: document.getElementById('resType'),
    resRaw: document.getElementById('resRaw'),
    resChars: document.getElementById('resChars'),
    resCons: document.getElementById('resCons'),
    resTime: document.getElementById('resTime'),
    resOther: document.getElementById('resOther'),
    resChart: document.getElementById('resChart'),
    btnRepeat: document.getElementById('btnRepeat'),
    btnNext: document.getElementById('btnNext'),
    btnOwn: document.getElementById('btnOwn'),
    sink: document.getElementById('sink'),
    themeToggle: document.getElementById('themeToggle')
  };

  function updateColors(){
    const bodyStyles = getComputedStyle(document.body);
    const canvasStyles = getComputedStyle(canvas);
    COLORS.bg = canvasStyles.backgroundColor || COLORS.bg;
    COLORS.ink = bodyStyles.getPropertyValue('--muted').trim() || COLORS.ink;
    COLORS.correct = bodyStyles.getPropertyValue('--good').trim() || COLORS.correct;
    COLORS.wrong = bodyStyles.getPropertyValue('--bad').trim() || COLORS.wrong;
  }

  // ---------- theme ----------
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.body.classList.add('light');
  }
  updateColors();
  els.themeToggle.textContent = document.body.classList.contains('light') ? 'dark mode' : 'light mode';
  els.themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    els.themeToggle.textContent = isLight ? 'dark mode' : 'light mode';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateColors();
    if (resultsView.classList.contains('show')) drawResultChart();
  });

  // ---------- state ----------
  const params = new URLSearchParams(location.search);
  let wordsTarget = clamp(parseInt(params.get('w')) || WORD_GOAL_DEFAULT, 5, 200);
  let timerSeconds = clamp(parseInt(params.get('t')) || TIMER_LEN, 15, 300);

  let state = {
    text: "",
    chars: [],
    marks: [],      // 0=pending, 1=correct, -1=wrong
    index: 0,
    errors: 0,      // total wrong keypresses, even if corrected
    started: false,
    startTimeMs: 0,       // first keystroke time
    remaining: timerSeconds,
    timerId: null,
    // layout
    dpr: 1, cols: 0, rows: 0, charW: 0, lineH: 0, viewRow: 0, pos: [],
    // series for graph and consistency
    samples: [], sampleSeconds: [], lastSampleSec: 0,
    lastTypeAt: 0, afkSeconds: 0
  };

  // ---------- helpers ----------
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function normalizeText(s){ return (s || "").replace(/\s+/g,' ').trim().replace(/\s{2,}/g,' '); }
  function pickText(wordGoal){
    const words = [];
    while(words.length < wordGoal){
      const w = SAMPLES[Math.floor(Math.random()*SAMPLES.length)].split(/\s+/);
      words.push(...w);
    }
    return words.slice(0, wordGoal).join(' ');
  }
  function setFont(){ ctx.font = `${FONT_SIZE * state.dpr}px ${FONT_FAMILY}`; ctx.textBaseline = "top"; }
  function measure(){
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    state.dpr = dpr;
    const cssW = canvas.clientWidth, cssH = canvas.clientHeight;
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    setFont();
    state.charW = Math.round(ctx.measureText("0").width) + Math.round(LETTER_SPACING * dpr);
    state.lineH = Math.round(FONT_SIZE * LINE_HEIGHT_FACTOR * dpr);
    const innerW = canvas.width  - 48 * dpr, innerH = canvas.height - 48 * dpr;
    state.cols = Math.max(8, Math.floor(innerW / state.charW));
    state.rows = Math.max(1, Math.floor(innerH / state.lineH));
  }

  // --------- FIXED: word-wrapped layout with no first-word indent
  function buildLayout(){
    state.pos = new Array(state.chars.length);
    let row = 0, col = 0, i = 0;
    const cols = state.cols;

    while (i < state.chars.length) {
      // find next word [i..j-1]
      let j = i;
      while (j < state.chars.length && state.chars[j] !== ' ') j++;
      const len = j - i;
      if (len === 0) { // safety
        i++;
        continue;
      }

      // wrap whole word if it doesn't fit (but allow at col 0)
      if (col > 0 && col + len > cols) { row++; col = 0; }

      // place the word characters
      for (let k = i; k < j; k++) { state.pos[k] = { row, col }; col++; }

      // handle trailing space WITHOUT indenting next line
      if (j < state.chars.length && state.chars[j] === ' ') {
        const spCol = col;
        const spRow = row;
        // store space at the same row; if it would overflow, put it "offscreen" at col==cols
        state.pos[j] = { row: spRow, col: Math.min(spCol, cols) };

        // advance: if space overflowed, go to new line at col 0, else increment col
        if (spCol >= cols) { row++; col = 0; } else { col++; }
        i = j + 1;
      } else {
        i = j;
      }
    }
  }

  function ensureCaretVisible(){
    const rc = state.pos[state.index] || {row:0,col:0};
    const row = rc.row, bottom = state.viewRow + state.rows - 1;
    if (row > bottom) state.viewRow = row - (state.rows - 1);
    if (row < state.viewRow) state.viewRow = row;
    state.viewRow = Math.max(0, state.viewRow);
  }

  // ---------- rendering ----------
  function clear(){ ctx.fillStyle = COLORS.bg; ctx.fillRect(0,0,canvas.width,canvas.height); }
  function drawText(){
    const dpr = state.dpr, pad = 24 * dpr, startX = pad, startY = pad;
    for (let i = 0; i < state.chars.length; i++) {
      const rc = state.pos[i]; if (!rc) continue;
      const vRow = rc.row - state.viewRow; if (vRow < 0 || vRow >= state.rows) continue;
      const x = startX + rc.col * state.charW, y = startY + vRow * state.lineH;
      const ch = state.chars[i], mark = state.marks[i] || 0;

      // don't render spaces that land at column 0 or that were placed "offscreen"
      if (ch === ' ' && (rc.col === 0 || rc.col >= state.cols)) continue;

      if (mark === 1) ctx.fillStyle = COLORS.correct;
      else if (mark === -1) ctx.fillStyle = COLORS.wrong;
      else ctx.fillStyle = COLORS.ink;
      ctx.fillText(ch, x, y);
    }
    // caret (blinking)
    if (Math.floor(Date.now()/500) % 2 === 0) {
      const rc = state.pos[state.index];
      if (rc){
        const vRow = rc.row - state.viewRow; if (vRow>=0 && vRow<state.rows){
          const dpr = state.dpr, pad = 24*dpr, x = pad + rc.col * state.charW, y = pad + vRow*state.lineH;
          ctx.fillStyle = CARET_COLOR;
          const top = Math.round(FONT_SIZE * dpr * CARET_TOP), h = Math.round(FONT_SIZE * dpr * CARET_HEIGHT);
          ctx.fillRect(x, y + top, Math.max(1, Math.round(CARET_THICKNESS * dpr)), h);
        }
      }
    }
  }
  function render(){ clear(); drawText(); requestAnimationFrame(render); }

  // ---------- stats ----------
  function elapsedMinutes(){
    if (!state.started) return 0;
    const ms = Math.max(1, performance.now() - state.startTimeMs);
    return ms / 60000;
  }
  function recomputeStats(){
    let correct=0, wrong=0;
    for (const m of state.marks){ if (m===1) correct++; else if (m===-1) wrong++; }
    const typed = correct + wrong;
    const total = correct + state.errors;
    const tmin = elapsedMinutes();
    const wpm = tmin>0 ? (correct/5) / tmin : 0;        // correct-only WPM
    const raw = tmin>0 ? (typed/5) / tmin : 0;          // gross WPM
    const acc = total>0 ? (correct/total)*100 : 100;
    els.wpm.textContent = Math.round(wpm);
    els.acc.textContent = `${Math.round(acc)}%`;
    return {correct, wrong, typed, wpm, raw, acc: Math.round(acc)};
  }

  // ---------- timer & sampling ----------
  function startTimer(){
    if (state.started) return;
    state.started = true;
    state.startTimeMs = performance.now();
    state.lastSampleSec = 0;
    state.samples = []; state.sampleSeconds = [];
    state.lastTypeAt = performance.now();
    state.afkSeconds = 0;
    state.timerId = setInterval(() => {
      state.remaining = Math.max(0, state.remaining - 0.1);
      els.time.textContent = state.remaining.toFixed(1);

      const now = performance.now();
      if (now - state.lastTypeAt > 2000) state.afkSeconds = Math.min(timerSeconds, state.afkSeconds + 0.1);

      const elapsedSec = Math.floor((now - state.startTimeMs)/1000);
      if (elapsedSec > state.lastSampleSec){
        state.lastSampleSec = elapsedSec;
        const {wpm} = recomputeStats();
        state.samples.push(wpm);
        state.sampleSeconds.push(elapsedSec);
      }
      if (state.remaining <= 0) finish();
    }, 100);
  }

  function finish(){
    clearInterval(state.timerId); state.timerId = null;
    showResultsPage();
  }

  // ---------- input / control ----------
  function reset(newText=true){
    clearInterval(state.timerId); state.timerId = null;
    state.started = false; state.index = 0; state.viewRow = 0; state.errors = 0;
    state.remaining = timerSeconds;
    els.time.textContent = state.remaining.toFixed(1);

    if (newText || !state.text) state.text = pickText(wordsTarget);
    state.text = normalizeText(state.text);
    state.chars = state.text.split('');
    buildLayout();
    state.marks = new Array(state.chars.length).fill(0);

    recomputeStats();
    focusSink();
    ensureCaretVisible();
    hideResultsPage();
  }

  function handleKeydown(e){
    const key = (e.key || ""), withMod = e.ctrlKey || e.metaKey || e.altKey;
    if (!els.overlay.classList.contains('show') && resultsView.classList.contains('show') === false) focusSink();

    if (key.toLowerCase() === 'r' && withMod){ e.preventDefault(); reset(false); return; }
    if (key.toLowerCase() === 'n' && withMod){ e.preventDefault(); reset(true);  return; }
    if (key === 'Escape'){
      if (els.overlay.classList.contains('show')) { hideOverlay(); return; }
      if (resultsView.classList.contains('show')) { hideResultsPage(); reset(false); return; }
      e.preventDefault(); reset(false); return;
    }
  }

  function handleInput(e){
    if (els.overlay.classList.contains('show') || resultsView.classList.contains('show')) return;

    const it = e.inputType || "", data = e.data;
    if (!state.started && (it === "insertText" || it === "insertCompositionText")) startTimer();

    if (it === "deleteContentBackward"){
      if (state.index > 0){
        state.index--; state.marks[state.index] = 0;
        ensureCaretVisible(); recomputeStats();
      }
      return;
    }

    if (it === "insertText" || it === "insertCompositionText"){
      if (state.index >= state.chars.length){ finish(); return; }
      const str = data ?? "";
      for (const c of str){
        const expected = state.chars[state.index];
        const ok = (c === expected);
        state.marks[state.index] = ok ? 1 : -1;
        if (!ok) state.errors++;
        state.index++; state.lastTypeAt = performance.now();
        ensureCaretVisible();
        if (state.index >= state.chars.length) break;
      }
      recomputeStats();
      if (state.index >= state.chars.length) finish();
      return;
    }

    if (it === "insertFromPaste" && e.data){
      for (const c of e.data){
        if (state.index >= state.chars.length) break;
        const expected = state.chars[state.index];
        const ok = (c === expected);
        state.marks[state.index] = ok ? 1 : -1;
        if (!ok) state.errors++;
        state.index++; state.lastTypeAt = performance.now();
      }
      ensureCaretVisible(); recomputeStats();
      if (state.index >= state.chars.length) finish();
    }
  }

  // ---------- custom text ----------
  function showOverlay(){ els.overlay.classList.add('show'); els.customArea.value = state.text; setTimeout(()=>els.customArea.focus(),0); }
  function hideOverlay(){ els.overlay.classList.remove('show'); focusSink(); }
  function useCustomText(){
    const txt = normalizeText(els.customArea.value);
    if (!txt){ hideOverlay(); return; }
    state.text = txt; reset(false); hideOverlay();
  }

  // ---------- RESULTS PAGE ----------
  function showResultsPage(){
    const {correct, wrong, typed, wpm, raw, acc} = recomputeStats();
    const missed = Math.max(0, state.chars.length - typed);

    // consistency from WPM samples
    let cons = "—";
    if (state.samples.length >= 2){
      const avg = state.samples.reduce((a,b)=>a+b,0)/state.samples.length;
      const sd = Math.sqrt(state.samples.map(v=>Math.pow(v-avg,2)).reduce((a,b)=>a+b,0)/(state.samples.length-1));
      const cv = avg>0 ? (sd/avg)*100 : 100;
      cons = `${Math.max(0, Math.min(100, Math.round(100 - cv))) }%`;
    }

    const afkPct = Math.round((state.afkSeconds / timerSeconds) * 100);

    els.resWpm.textContent = Math.round(wpm);
    els.resAcc.textContent = `${acc}%`;
    els.resType.textContent = `time ${timerSeconds} • english`;
    els.resRaw.textContent = Math.round(raw);
    els.resChars.textContent = `${correct}/${wrong}/0/${missed}`;
    els.resCons.textContent = cons;
    els.resTime.textContent = `${timerSeconds}s`;
    els.resOther.textContent = afkPct>0 ? `afk detected (${afkPct}%)` : "—";

    drawResultChart();

    // swap to results view
    for (const el of typingEls) el.style.display = 'none';
    resultsView.classList.add('show');
  }

  function hideResultsPage(){
    resultsView.classList.remove('show');
    for (const el of typingEls) el.style.display = '';
  }

  function drawResultChart(){
    const c = els.resChart, g = c.getContext('2d');
    const W = c.width, H = c.height;
    const light = document.body.classList.contains('light');
    g.clearRect(0,0,W,H);
    g.fillStyle = light ? "#ffffff" : "#0d1623"; g.fillRect(0,0,W,H);
    // grid
    g.strokeStyle = light ? "#d0d7e2" : "#223148"; g.lineWidth = 1;
    g.beginPath(); for (let x=40; x<W; x+=60){ g.moveTo(x,20); g.lineTo(x,H-30); } g.stroke();
    g.beginPath(); for (let y=20; y<H-30; y+=30){ g.moveTo(40,y); g.lineTo(W-10,y); } g.stroke();

    const xs = state.sampleSeconds, ys = state.samples;
    if (!xs.length) return;
    const maxWpm = Math.max(40, Math.max(...ys) * 1.2);
    const x0 = 40, y0 = H-30, x1 = W-10, y1 = 20;
    const xscale = (x1 - x0) / Math.max(1, xs[xs.length-1]);
    const yscale = (y0 - y1) / maxWpm;

    g.strokeStyle = "#e2b714"; g.lineWidth = 2;
    g.beginPath();
    for (let i=0;i<xs.length;i++){
      const x = x0 + xs[i]*xscale;
      const y = y0 - ys[i]*yscale;
      if (i===0) g.moveTo(x,y); else g.lineTo(x,y);
    }
    g.stroke();
  }

  // ---------- focus ----------
  function focusSink(){
    try { els.sink.focus({preventScroll:true}); } catch {}
    try { els.sink.setSelectionRange(els.sink.value.length, els.sink.value.length); } catch {}
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible'
        && !els.overlay.classList.contains('show')
        && !resultsView.classList.contains('show')) {
      focusSink();
    }
  });
  window.addEventListener('focus', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });
  canvas.addEventListener('pointerdown', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });
  app.addEventListener('pointerdown', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });

  // ---------- timer selector ----------
  timerSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-t]');
    if (!b) return;
    const t = parseInt(b.dataset.t, 10);
    if (Number.isFinite(t)) {
      for (const x of timerSeg.querySelectorAll('button')) x.classList.remove('is-active');
      b.classList.add('is-active');
      timerSeconds = t;
      els.timerBadge.textContent = `${t}s`;
      reset(false);
      syncURL();
    }
  });

  // ---------- wire ----------
  function syncURL(){
    const url = new URL(location.href);
    url.searchParams.set('w', wordsTarget);
    url.searchParams.set('t', timerSeconds);
    history.replaceState({}, '', url);
  }

  els.restart.addEventListener('click', () => reset(false));     // repeat
  els.newText.addEventListener('click', () => reset(true));       // next
  els.shorter.addEventListener('click', () => { wordsTarget = clamp(wordsTarget-5, 5, 200); els.wordCount.textContent = wordsTarget; reset(true); syncURL(); });
  els.longer.addEventListener('click', () => { wordsTarget = clamp(wordsTarget+5, 5, 200); els.wordCount.textContent = wordsTarget; reset(true); syncURL(); });

  els.custom.addEventListener('click', showOverlay);
  els.cancelCustom.addEventListener('click', hideOverlay);
  els.useCustom.addEventListener('click', useCustomText);

  els.btnRepeat.addEventListener('click', () => { hideResultsPage(); reset(false); });
  els.btnNext.addEventListener('click',   () => { hideResultsPage(); reset(true);  });
  els.btnOwn.addEventListener('click',    () => { hideResultsPage(); showOverlay(); });

  document.addEventListener('keydown', handleKeydown);
  els.sink.addEventListener('input', handleInput);
  window.addEventListener('resize', () => { measure(); buildLayout(); ensureCaretVisible(); });

  // ---------- init ----------
  els.wordCount.textContent = WORD_GOAL_DEFAULT;
  els.timerBadge.textContent = `${timerSeconds}s`;

  measure();
  state.text = pickText(wordsTarget);
  reset(false);
  els.time.textContent = timerSeconds.toFixed(1);
  focusSink();

  requestAnimationFrame(render);
});
