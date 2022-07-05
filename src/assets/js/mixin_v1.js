/**
* 共用- universalMethods 資料
* 共用- sharedFn 共用程式
*/
export let universalMethods = {
    data: function(){
        return {
            domain: window.location.host === '192.168.1.234' ? '' : 'https://event.1111.com.tw',
            api:{
                talentNo: '/eventAPI/tool/api_check_talentNo.asp',
                GetMbrLvSignUp: '/eventAPI/api/MbrRestore_22y/GetMbrLvSignUp', // get 報名撈取
                getMbrLvGrp: '/eventAPI/api/MbrRestore_22y/GetMbrLvGrp', // get 卡別撈取
                mbrLvSignUpCreate: '/eventAPI/api/MbrRestore_22y/Front/MbrLvSignUpCreate', // post 會員報名
                mbrLvCreate: '/eventAPI/api/MbrRestore_22y/MbrLvDataCreate', // 新增、更新卡別
                memberActivities : '/eventAPI/api/MbrRestore_22y/Back/GetMission', // 舊會員復育卡⽚任務撈取 (會員專屬活動)
            },
            url: 'https://www.1111.com.tw/Member/MemberData',
            memberUrl: window.location.host === '192.168.1.234' ? 'http://192.168.1.234/talents/memberlogin.asp?ref='+ window.location.href : 'https://www.1111.com.tw/login/index?ReturnUrl=' + window.location.href,
            grade:{
                condition: [
                    { 
                        name:'confirm' , 
                        text: '電子信箱/手機雙認證', 
                        status: 0,
                        unlockTask:[
                            {
                                id: 1,
                                title: '電子信箱/手機雙認證',
                                name:'confirm',
                                status: 0,
                                subLabel: '於輸入完畢電子郵件以及聯絡電話，點選【我要驗證】，呈現色勾勾後，即為完成雙認證任務唷！',
                                unlockTaskModal:[
                                    {
                                        id: 11,
                                        idClass: 'gold_step01',
                                        labelledby: 'gold_step01Label',
                                        img: './assets/img/index_step_img/gold_step01.jpg',
                                        imgAlt: '電子信箱/手機雙認證步驟圖',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    },
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData?autoRun=doubleverify',
                                
                            }
                        ]
                    },
                    { 
                        name:'photo' , 
                        text: '個人照片上傳', 
                        status: 0,
                        unlockTask:[
                            {
                                id: 2,
                                title: '個人照片上傳',
                                name:'photo' ,
                                status: 0,
                                subLabel: '只要挑選一張清爽清楚的大頭照，上傳成功即可完成照片上傳任務唷！',
                                unlockTaskModal:[
                                    {
                                        id: 21,
                                        idClass: 'gold_step02',
                                        labelledby: 'gold_step02Label',
                                        img: './assets/img/index_step_img/gold_step02.jpg',
                                        imgAlt: '個人照片上傳步驟圖',
                                        url: 'https://www.1111.com.tw/Member/MemberData?autoRun=photo',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData?autoRun=photo',
                                
                            }
                        ]
                    },
                    { 
                        name:'person' , 
                        text: '完成個人資料100%', 
                        status: 0,
                        unlockTask:[
                            {
                                id: 3,
                                title: '完成個人資料100%',
                                name:'person',
                                status: 0,
                                subLabel: '完成以下欄位資訊填寫：出生年月日、電子郵件、聯絡方式、手機號碼、聯絡地址。即可完成個人資料完成度100%的任務唷！',
                                unlockTaskModal:[
                                    {
                                        id: 3,
                                        idClass: 'gold_step03',
                                        labelledby: 'gold_step03Label',
                                        img: './assets/img/index_step_img/gold_step03.jpg',
                                        imgAlt: '完成個人資料100%步驟圖',
                                        url: 'https://www.1111.com.tw/Member/MemberData?autoRun=birthvalid',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData?autoRun=birthvalid',
                                
                            },
                        ]
                    },
                    { 
                        name:'resumehave' , 
                        text: '履歷表建立', 
                        status: 0,
                        unlockTask:[
                            {
                                id: 1,
                                title: '履歷表建立',
                                name:'resumehave',
                                status: 0,
                                subLabel: '您目前尚未有履歷表唷～趕緊新增一份，讓幸福企業看見您！',
                                unlockTaskModal:[
                                    {
                                        id: 11,
                                        idClass: 'platinum_step01a',
                                        labelledby: 'platinum_step01aLabel',
                                        img: './assets/img/index_step_img/platinum_step01.jpg',
                                        imgAlt: '履歷表建立步驟圖',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData',
                                
                            },
                        ]
                    },
                    { 
                        name:'education' , 
                        text: '學歷填寫', 
                        status:0,
                        unlockTask:[
                            {
                                id: 2,
                                title: '學歷填寫',
                                name:'education' ,
                                status: 0,
                                subLabel: `新增或是修改您的學歷資訊，需要完成填寫的欄位包括：<br>
                                教育程度、就讀時間與畢業時間、就讀地區、學校名稱、科系名稱與類別<br>
                                完成後記得儲存設定唷，即可完成學歷填寫的任務唷！`,
                                unlockTaskModal:[
                                    {
                                        id: 21,
                                        idClass: 'platinum_step02a',
                                        labelledby: 'platinum_step02aLabel',
                                        img: './assets/img/index_step_img/platinum_step02a.jpg',
                                        imgAlt: '學歷填寫步驟圖1',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    },
                                    {
                                        id: 22,
                                        idClass: 'platinum_step02b',
                                        labelledby: 'platinum_step02bLabel',
                                        img: './assets/img/index_step_img/platinum_step02b.jpg',
                                        imgAlt: '學歷填寫步驟圖2',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData',
                                
                            }
                        ]
                    },
                    { 
                        name:'workyear' , 
                        text: '工作總年資填寫', 
                        status:0,
                        unlockTask:[
                            {
                                id: 3,
                                title: '工作總年資填寫',
                                name:'workyear',
                                status: 0,
                                subLabel: `請根據您的工作資歷，您的工作年資！<br>
                                完成後記得儲存設定，即可完成工作年資填寫的任務唷！`,
                                unlockTaskModal:[
                                    {
                                        id: 31,
                                        idClass: 'platinum_step03a',
                                        labelledby: 'platinum_step03aLabel',
                                        img: './assets/img/index_step_img/platinum_step03a.jpg',
                                        imgAlt: '工作總年資填寫步驟圖1',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    },
                                    {
                                        id: 32,
                                        idClass: 'platinum_step03b',
                                        labelledby: 'platinum_step03bLabel',
                                        img: './assets/img/index_step_img/platinum_step03b.jpg',
                                        imgAlt: '工作總年資填寫步驟圖2',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData',
                                
                            }
                        ]
                    },
                    { 
                        name:'experience' ,
                        text: '工作經歷填寫', 
                        status:0,
                        unlockTask:[
                            {
                                id: 4,
                                title: '工作經歷填寫',
                                name:'experience',
                                status: 0,
                                subLabel: `新增或是修改您的工作經歷資訊，需要完成填寫的欄位包括：<br>
                                工作性質、公司名稱、產業類別、職務名稱、職務類別、開始時間、工作地點<br>
                                完成後記得儲存設定，即可完成工作經歷填寫的任務唷！`,
                                unlockTaskModal:[
                                    {
                                        id: 41,
                                        idClass: 'platinum_step04a',
                                        labelledby: 'platinum_step04aLabel',
                                        img: './assets/img/index_step_img/platinum_step04a.jpg',
                                        imgAlt: '工作經歷填寫填寫步驟圖1',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    },
                                    {
                                        id: 42,
                                        idClass: 'platinum_step04b',
                                        labelledby: 'platinum_step04bLabel',
                                        img: './assets/img/index_step_img/platinum_step04b.jpg',
                                        imgAlt: '工作經歷填寫填寫步驟圖2',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData',
                                
                            }
                        ]
                    },
                    { 
                        name:'workneed' , 
                        text: '應徵條件填寫', 
                        status:0,
                        unlockTask:[
                            {
                                id: 5,
                                title: '應徵條件填寫',
                                name:'workneed',
                                status: 0,
                                subLabel: `新增或是修改您的應徵條件資訊，需要完成填寫的欄位包括：<br>
                                工作性質、職務名稱、職務類別、產業類別、薪資待遇、上班地點、上班時段、休假制度、可上班日期`,
                                unlockTaskModal:[
                                    {
                                        id: 51,
                                        idClass: 'platinum_step05a',
                                        labelledby: 'platinum_step05aLabel',
                                        img: './assets/img/index_step_img/platinum_step05a.jpg',
                                        imgAlt: '工作經歷填寫填寫步驟圖1',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    },
                                    {
                                        id: 52,
                                        idClass: 'platinum_step05b',
                                        labelledby: 'platinum_step05bLabel',
                                        img: './assets/img/index_step_img/platinum_step05b.jpg',
                                        imgAlt: '工作經歷填寫填寫步驟圖2',
                                        url: 'https://www.1111.com.tw/Member/MemberData',
                                    }
                                ],
                                url: 'https://www.1111.com.tw/Member/MemberData',
                                
                            },
                        ]
                    },
                ],
                activity:{
                    goldMember:{
                        bigMark: '解鎖黃金卡進度',
                        title: '開通黃金卡',
                        subLabel: '完成以下任務解鎖黃金卡，可查看更多屬於黃金卡或是鉑金卡的會員權益說明唷！',
                        btnName: '完成任務升級卡別',
                        btnNameOk: '取得黃金卡',
                        url: 'https://www.1111.com.tw/Member/MemberData',
                    },
                    platinumMember: {
                        bigMark: '解鎖鉑金卡進度',
                        title: '開通鉑金卡',
                        subLabel: '完成以下任務解鎖鉑金卡，可查看更多屬於鉑金卡的會員權益說明唷！',
                        btnName: '完成任務升級卡別',
                        btnNameOk: '取得鉑金卡',
                        url: 'https://www.1111.com.tw/Member/MemberData',
                    }
                }
            },
            step:{
                goldMember: {
                    card: {
                        title: '黃金卡',
                        subLabel: '黃金卡會員專屬活動',
                        logoImg: './assets/img/index/card_logo.svg',
                        bgImg: './assets/img/index/bg_card_gold.jpg',
                        serialNumber: '',
                        pickUpTime: '',
                    },
                    activityTitle: '黃金卡會員專屬活動',
                    bigMark: '完成以下任務解鎖黃金卡',
                    // 以改走API 方式 memberActivities
                    // activity:[
                    //     {
                    //         title: '恭喜您已取黃金卡',
                    //         subLabel: `您現在已取得<b>『回饋鐵粉天天抽1萬』</b>活動的資格`,
                    //         url: 'https://event.1111.com.tw/event22/2022newmember/index.asp'
                    //     }
                    // ],
                },
                platinumMember: {
                    card: {
                        title: '鉑金卡',
                        subLabel: '鉑金卡會員專屬活動',
                        logoImg: './assets/img/index/card_logo_black.svg',
                        bgImg: './assets/img/index/bg_card_platinum.jpg',
                        serialNumber: '',
                        pickUpTime: '',
                    },
                    activityTitle: '鉑金卡會員專屬活動',
                    bigMark: '完成以下任務解鎖鉑金卡',
                    // 以改走API 方式 memberActivities
                    // activity:[
                    //     {
                    //         title: '恭喜您已取鉑金卡',
                    //         subLabel: `您現在已取得<b>『就職紅包』</b>活動的資格`,
                    //         url: 'https://event.1111.com.tw/event22/22y_1w/index.asp'
                    //     }
                    // ],
                },
            }
        }
    }
}
export let sharedFn = {
    methods:{
        /**
        * 共用- 刷新Modal
        */
        waitForPromptModalFn(){
            this.refreshOpen = true;
            if(this.refreshOpen === true){
                this.waitForPromptModal();
                setTimeout(() => {
                    this.refreshOpen = false;
                }, 500); 
                return;
            }
        },
        /**
        * 共用- 頁面刷新
        */
        warnDisabled() {
            this.disabled = true;
            this.upgradeFnAPI();
            // 提示等待時間model
            if(this.refreshOpen === true){
                switch(this.cardName){
                    case '無卡':
                        this.waitForPromptModalFn();
                        break;
                    case '黃金卡':
                        this.waitForPromptModalFn();
                        break;
                    case '鉑金卡':
                        this.waitForPromptModalFn();
                        break;
                    default:
                        console.log('提示等待時間model例外處理');
                }
            }
            setTimeout(() => {
                this.disabled = false;
            }, 500);  
        },
        /**
        * 共用- 登入按鈕 以及任務完成取卡邏輯
        */
        takeCardFn(){
            // this.downgrade = true;
            this.upgrade = true;
            if(this.talentNo === '' ){
                this.memberUrlLink = this.$data.memberUrl;
            }else{
                if(this.GetMbrLvSignUp === []){
                    // signupcreate
                    this.createAPI();
                    //  console.log(3);
                }else{
                    if(this.downgrade == true){
                        this.signUpForInformationApi();
                        // console.log(1);
                    }else{
                        if(this.upgrade == true){
                            // this.upgradeOpen = true;
                            this.carOpen = false;
                            this.signUpForInformationApi();
                            // console.log(2);
                        }else{
                            // console.log(4);
                            // 未達到升級開關關閉
                            this.upgrade = false;
                            // 未到可升等時改導連結 如果後台為給連結 就依照預篩
                            this.urlPath = this.GetMbrLvSignUp.urlPath != '' ? this.GetMbrLvSignUp.urlPath : this.urlLink;
                        }

                    }
                }
            }
        },
        /**
        * 共用- upgradeFnAPI 再用的 function
        */
        dateTimeFn(){
            const date = new Date(this.GetMbrLvSignUp.userlastCheckDate);
            // console.log('date', date);
            this.dataDateIn = date.toLocaleDateString('en-GB').split('/').reverse().join('/'); // '20211124'
            // 卡片時間 例外處理
            if(this.GetMbrLvSignUp.userlastCheckDate !== null){
                this.dateInNull = true;
            }
        },
        taskListNumberFor(status, name, sum){
            for (let i = 0; i < status.length; i++) {
                sum += parseInt(status[i]); 
                    this.taskList.forEach((item,index) =>{
                        if(item.name == name[i]) {
                            item.status = status[i]
                            item.unlockTask.forEach((nItem) =>{
                             nItem.status = status[i];
                        })
                    }   
                })
            }
        },
        taskListNumberFn(){
            // this.sumFn();
            if(this.nextMissionStatus != ''){
                this.taskListNumberFor(this.nextMissionStatus, this.nextMissionName, this.sum);
            }else{
                this.taskListNumberFor(this.thisMissionStatus, this.thisMissionName, this.total);
            }

        },
        sumFn(){
            this.sum = this.SumDataFor(this.nextMissionStatus);
            this.total = this.SumDataFor(this.thisMissionStatus);
        },
        missionCardNameFn(){
            //顯示卡別
            switch(this.cardName){
                case '無卡':
                    this.carOpen = true;
                    this.dataDateOpen = false;
                    // this.diamondCardOpen = false;   
                    this.memberCardOpen = false;
                    // this.unlockWin = true;
                    this.taskActivityCard = this.taskActivity.goldMember;
                     // 任務按鈕
                     this.taskBtnName = this.taskActivity.goldMember.btnName;
                    if(this.sum === this.nextMissionName.length){
                        this.taskBtnName = this.taskActivity.goldMember.btnNameOk;
                        return;
                    }
                    break;
                case '黃金卡':
                    // console.log('黃金卡');
                    this.dataDateOpen = true;
                    // 黃金升柏金
                    this.taskActivityCard = this.taskActivity.platinumMember;
                    // 升級成黃金開通活動任務
                    this.memberCardOpen = true;
                    // this.unlockWin = true;
                    this.taskBtnName = this.taskActivity.platinumMember.btnName;
                    if(this.sum === this.nextMissionName.length){
                        this.taskBtnName = this.taskActivity.platinumMember.btnNameOk;
                        // this.unlockWin = false;
                        return;
                    }
                    break;
                case '鉑金卡':
                    // console.log('鉑金卡');
                    this.dataDateOpen = true;
                    // 升到柏金任務都可關閉因為目前是最高等級
                    this.taskOpen = false;
                    // 顯示柏金卡
                    this.cardTypeTaskInformation = this.$data.step.platinumMember;
                    if(this.nextMissionStatus === ''){
                        // this.goldCardOpen = true;
                        this.taskOpen = false;
                        // this.diamondCardOpen = true;
                        this.carOpen = false;
                    }
                    // 升級成柏金卡開通活動任務
                    this.memberCardOpen = true;
                    // 顯示鑽石卡
                    // this.diamondCardOpen = true;
                    this.carOpen = false;
                    // this.unlockWin = false;

                    break;
                default:
                    this.dataDateOpen = true;
                    this.taskOpen = false;
                    // this.signOutOpen = true;
                    this.carOpen = true;
                    this.loginOpen = false;
                    console.log('例外處理');
            }
        },
        upgradeDegradeFn(){
            if(this.sum ===  this.nextMissionStatus.length){
                this.upgrade = true;
                // console.log('升級');
                // 如果升級 刷新提示Modal 開啟
                this.refreshOpen = true;
                return;
            }
            // 降級
            // 無卡升黃金卡 thisMissionStatus 會是空
            if(this.thisMissionStatus == ''){
                this.total = 0;
                this.thisMissionStatus = 0;
                return;
            }
            if(this.total !==  this.thisMissionName.length){
                this.downgrade = true;
                this.signUpForInformationApi();
                // 如果降級 刷新提示Modal 開啟
                this.refreshOpen = true;
                // 如果降級 升級開關關起來
                this.upgrade = false;
                return;
            }    

        },
        /**
        * 共用- 刷新提示Modal
        */
        waitForPromptModalAdd(){
            document.addEventListener("DOMContentLoaded", () =>  { this.waitForPromptModal();});
        },
        waitForPromptModal() {
            var btn = document.getElementById("refreshBtn");
            var myModal = new bootstrap.Modal(document.getElementById("refresh_info"));
            myModal.show();
            btn.addEventListener("click", function() {
                myModal.hide();
            });
        },
        /**
        * 共用- 取卡以及重新撈取資料
        */
        signUpForInformationApi(){
            this.createAPI();
                setTimeout(() => {
                    this.upgradeFnAPI();
            }, 500);
        },
        /**
        * 資料獲取
        * @param {string} a - 卡別名稱
        */
        memberCardColorFn(a) {
            switch (a) {
                case '無卡':
                return  '';

                case '黃金卡':
                return  '';

                case '鉑金卡':
                return 'membership_card_platinum';

                default:
                return '';
            }
        },
        /**
        * 資料獲取
        * @param {string} arr - 個狀態任務完成數字
        */
        SumDataFor(arr){
            let sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += parseInt(arr[i]);
            };
            if (isNaN(sum)) {
                // 如果為空預設為0
                return 0;
            }
            return sum;
        },
        /**
        * 資料獲取
        * @param {string} url - API路徑
        * @param {function} callback - 回呼函數
        */
        fetchData(url, callback) {
            return axios
                .get(this.domain + url)
                .then((res) => {
                    callback(res)
                })
                .catch((error) => {
                    console.log('error path = ', url)
                    console.log('error msg = ', error)
            })
        },
        /**
        * 資料獲取
        * @param {string} url - API路徑
        * @param {object} data - 傳送的資料
        * @param {function} callback - 回呼函數
        * @param {function} header
        */
        postData(url, data, callback) {
            return axios({
                method: 'post',
                url: `${this.domain}${url}`,
                data: data
            })
            .then((res) => {
                callback(res)
            })
            .catch((error) => {
                console.log('error path = ', url)
                console.log('error msg = ', error)
            })
        },
    }
}