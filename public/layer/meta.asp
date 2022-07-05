<%Response.Buffer = true:Response.CharSet = "UTF-8":Session.CodePage = 65001%>
<%
		'取得當下網址'
		queryS = Request.QueryString("seachType")
		if queryS = "1" then
				SEOTitle = "111年度大學及四技姓名查榜︱入學榜單查詢-1111人力銀行"
				SEOKeywords = "姓名查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜"
				SEODescription = "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果！"
				SEOUrl = "https://event.1111.com.tw/event22/22yAdmissionSystem/inquire?years=111&seachType=1"
		elseif queryS = "2" then
				SEOTitle = "111年度大學及四技應試號碼查榜︱入學榜單查詢-1111人力銀行"
				SEOKeywords = "應試號碼查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜"
				SEODescription = "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果！"
				SEOUrl = "https://event.1111.com.tw/event22/22yAdmissionSystem/inquire?years=111&seachType=2"

		else
				SEOTitle = "111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行1111"
				SEOKeywords = "大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜"
				SEODescription = "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果！"
				SEOUrl = "https://event.1111.com.tw/event22/22yAdmissionSystem/"
		end if 
%>

<title>
    <%=SEOTitle%>
</title>
<link rel="canonical" href="<%=SEOUrl%>" />
<meta name="title" content="<%=SEOTitle%>"> 
<meta name="keywords" content="<%=SEOKeywords%>">
<meta name="Description" content="<%=SEODescription%>">
<meta property="og:site_name" content="<%=SEOTitle%>">
<meta property="og:title" content="<%=SEOTitle%>">
<meta property="og:description" content="<%=SEODescription%>">
<meta property="og:keywords" content="<%=SEOKeywords%>">
<meta property="og:url" content="<%=SEOUrl%>">
<meta name="twitter:title" content="<%=SEOTitle %>">
<meta name="twitter:description" content="<%=SEODescription%>">
<meta name="twitter:keywords" content="<%=SEOKeywords%>">
<meta name="twitter:url" content="<%=SEOUrl%>" />
<script  type="application/ld+json">
	[
			{
				"@context": "http://schema.org/",
				"@type": "WebSite",
				"name": "<%=SEOTitle%>",
				"url": "<%=SEOUrl%>",
				"description": "<%=SEODescription%>",
				"potentialAction": {
						"@type": "SearchAction",
						"target": "https://event.1111.com.tw/event22/22yAdmissionSystem/result?years=111&typeRef=1&schoolType=1&seachType=2&ticketNum={search_term_string}",
						"query-input": "required name=search_term_string"
				}
		},
		{
				"@context": "http://schema.org",
				"@type": "Organization", "name": "1111人力銀行",
				"url": "https://www.1111.com.tw", "logo": "https://www.1111.com.tw/images102/logo0504.png", "contactPoint": [{ "@type": "ContactPoint", "telephone": "+886-02-8787-1111", "contactType": "customer service", "areaServed": ["TW"], "availableLanguage": ["Chinese"] }], "sameAs": ["https://www.facebook.com/1111jobbank", "https://twitter.com/1111jobbanknews", "https://www.youtube.com/user/1111JobBankNEWS", "https://www.linkedin.com/company/1111-job-bank"]
		}
	]
</script>