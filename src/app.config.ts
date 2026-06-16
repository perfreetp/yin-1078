export default defineAppConfig({
  pages: [
    'pages/tasks/index',
    'pages/photo/index',
    'pages/family/index',
    'pages/appointment/index',
    'pages/report/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '齿伴',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#94A3B8',
    selectedColor: '#5B8FF9',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/tasks/index',
        text: '今日任务'
      },
      {
        pagePath: 'pages/photo/index',
        text: '拍照复查'
      },
      {
        pagePath: 'pages/family/index',
        text: '家庭监督'
      },
      {
        pagePath: 'pages/appointment/index',
        text: '复诊安排'
      },
      {
        pagePath: 'pages/report/index',
        text: '成长报告'
      }
    ]
  }
})
