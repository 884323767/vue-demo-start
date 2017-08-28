 // Navigation Factory method
export function navigateTo(url) {
  window.f7.views[0].allowPageChange = true;
  window.f7.router.load(window.f7.views[0], {
    url,
  });
}

export function goBack() {
  window.f7.router.back();
}

const router = {
  navigate(url) {
    navigateTo(url);
  },

  escapePage() {
    this.$root.eventHub.$emit('showTabs', 1);
    this.$f7.views[0].allowPageChange = true;
    this.navigateToOverview();
  },

  hiddenBackButton() {
    if (this.client === 'guodu') {
      if (this.$f7.mainView.history.length === 2) {
        window.$$('.back.link').css('visibility', 'hidden');
        return true;
      }
    }
    if (this.client === 'convoy') {
      if (this.$f7.mainView.history.length === 3) {
        window.$$('.back.link').css('visibility', 'hidden');
        return true;
      }
    }
    return false;
  },

  navigateToQuestion() {
    this.navigate('question');
  },

  navigateToPortfolioDetail() {
    this.$root.eventHub.$emit('showTabs', 0);
    this.navigate('/portfolio_detail/');
  },

  navigateToPortfolioOpinion() {
    this.navigate('portfolio_opinion');
  },

  navigateToSummary() {
    this.navigate('summary');
  },

  navigateToOverview() {
    if(this.$store.state.isSFC && this.$route.path ==="overview"){
      this.$f7.views[0].url = 'login2';
    }
    this.navigate('overview');
  },

  navigateToForgetPassword() {
    this.navigate('forget_password');
  },

  navigateToLogin() {
    this.navigate('login');
  },

  navigateToStatement() {
    this.navigate('statement');
  },
};

export default router;
