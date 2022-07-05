export let universalMethods = {
    data() {
        return {
            domain: window.location.host === '192.168.1.234' ? '' : 'https://event.1111.com.tw/event22/2022membercard',
            // domain:{
            //     event: window.location.host === '192.168.1.234' ? '' : 'https://event.1111.com.tw/event22/2022membercard',
            //     memberRegeneration: window.location.host === '192.168.1.234' ? 'http://192.168.1.234/event22/22weiling/' : 'https://careermaster.1111.com.tw/event22/22weiling/'
            // },
            api:{
                talentNo: '/eventAPI/tool/api_check_talentNo.asp',
                GetMbrLvSignUp: '/eventAPI/api/MbrRestore_22y/GetMbrLvSignUp', // get 報名撈取
                getMbrLvGrp: '/eventAPI/api/MbrRestore_22y/GetMbrLvGrp', // get 卡別撈取
                mbrLvSignUpCreate: '/eventAPI/api/MbrRestore_22y/Front/MbrLvSignUpCreate', // post 會員報名
                mbrLvCreate: '/eventAPI/api/MbrRestore_22y/MbrLvDataCreate', // 新增、更新卡別
            },
            url: 'https://www.1111.com.tw/Member/MemberData',
            memberUrl: window.location.host === '192.168.1.234' ? 'http://192.168.1.234/talents/memberlogin.asp?ref='+ window.location.href : 'https://www.1111.com.tw/login/index?ReturnUrl=' + window.location.href,
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
                    schedule: {
                        bigMark: '解鎖黃金卡進度',
                        title: '開通黃金卡',
                        subLabel: '完成以下任務解鎖黃金卡',
                        activity:[
                            {
                                title: '恭喜您已取黃金卡',
                                subLabel: `您現在已取得<b>『回饋鐵粉天天抽1萬』</b>活動的資格`,
                                url: 'https://event.1111.com.tw/event22/2022newmember/index.asp'
                            }
                        ],
                        condition: [
                            { 
                                name:'confirm' , 
                                text: '電子信箱/手機雙認證', 
                                status: 0,
                            },
                            { 
                                name:'photo' , 
                                text: '個人照片上傳', 
                                status: 0,
                            },
                            { 
                                name:'person' , 
                                text: '個人資料100%', 
                                status: 0,
                            },
                        ],
                        btnName: '立即完成任務取得黃金卡',
                        url: 'https://www.1111.com.tw/Member/MemberData',
                    },
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
                            
                        },
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
                                    url: 'https://www.1111.com.tw/Member/MemberData',
                                }
                            ],
                            url: 'https://www.1111.com.tw/Member/MemberData',
                            
                        },
                        {
                            id: 3,
                            title: '個人資料100%',
                            name:'person',
                            status: 0,
                            subLabel: '完成以下欄位資訊填寫：出生年月日、電子郵件、聯絡方式、手機號碼、聯絡地址。即可完成個人資料完成度100%的任務唷！',
                            unlockTaskModal:[
                                {
                                    id: 3,
                                    idClass: 'gold_step03',
                                    labelledby: 'gold_step03Label',
                                    img: './assets/img/index_step_img/gold_step03.jpg',
                                    imgAlt: '個人資料100%步驟圖',
                                    url: 'https://www.1111.com.tw/Member/MemberData',
                                }
                            ],
                            url: 'https://www.1111.com.tw/Member/MemberData',
                            
                        },
                    ]
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
                    schedule: {
                        bigMark: '解鎖鉑金卡進度',
                        title: '開通鉑金卡',
                        subLabel: '完成以下任務解鎖鉑金卡',
                        activity:[
                            {
                                title: '恭喜您已取鉑金卡',
                                subLabel: `您現在已取得<b>『就職紅包』</b>活動的資格`,
                                url: 'https://event.1111.com.tw/event22/22y_1w/index.asp'
                            }
                        ],
                        condition: [
                            { 
                                name:'resumehave' , 
                                text: '履歷表建立', 
                                status: 0
                            },
                            { 
                                name:'education' , 
                                text: '學歷填寫', 
                                status:0
                            },
                            { 
                                name:'workyear' , 
                                text: '工作總年資填寫', 
                                status:0
                            },
                            { 
                                name:'workneed' ,
                                text: '工作經歷填寫', 
                                status:0
                            },
                            { 
                                name:'experience' , 
                                text: '應徵條件填寫', 
                                status:0
                            },
                        ],
                        btnName: '立即完成任務取得鉑金卡',
                        url: 'https://www.1111.com.tw/Member/MemberData',
                    },
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
                            
                        },
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
                            
                        },
                        {
                            id: 4,
                            title: '工作經歷填寫',
                            name:'workneed',
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
                            
                        },
                        {
                            id: 5,
                            title: '應徵條件填寫',
                            name:'experience',
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
            }
        }
    }
}