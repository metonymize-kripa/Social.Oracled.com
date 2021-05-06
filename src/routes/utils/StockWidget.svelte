<script>
export let my_ticker="SPY";
</script>


<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" >
  {
  "symbol": my_ticker,
  "width": "100%",
  "height": "100%",
  "locale": "en",
  "dateRange": "12M",
  "colorTheme": "light",
  "trendLineColor": "rgba(76, 17, 48, 1)",
  "underLineColor": "rgba(213, 166, 189, 1)",
  "isTransparent": true,
  "autosize": true,
  "largeChartUrl": ""
}
  </script>
</div>
<!-- TradingView Widget END -->
