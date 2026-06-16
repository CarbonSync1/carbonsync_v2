'use client';
import { useState } from 'react'

const featuredArticle = {
  category: 'FEATURED INSIGHT',
  title: 'How Autonomous Carbon Accounting is Reshaping Global Supply Chains.',
  desc: 'Read our latest whitepaper on the role of real-time data in achieving Scope 3 transparency across complex industrial networks and driving massive ROI.',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  fullText: 'For decades, enterprise carbon accounting has relied on manual spreadsheets and industry averages, leading to massive inaccuracies. CarbonSynqEarth is changing this paradigm. By integrating directly with ERP systems like SAP and Oracle, our autonomous platform gathers primary data across multi-tier supply chains in real-time. This whitepaper explores how predictive AI models and smart contracts are allowing global manufacturers to not only track their Scope 3 emissions with 99.9% accuracy but also identify rapid reduction opportunities, turning regulatory compliance into a massive competitive advantage.'
}

const articles = [
  {
    category: 'Security',
    title: 'Industry-leading security for ESG data.',
    desc: 'Our industry-leading security program protects your critical supply chain data and ensures compliance.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    fullText: 'At CarbonSynqEarth, we understand that ESG and supply chain data are among the most sensitive assets an enterprise holds. That is why our platform employs military-grade encryption, decentralized ledger technology, and continuous threat monitoring to ensure that your carbon accounting data is never compromised. Our robust security framework not only protects against external breaches but also ensures data integrity for your global compliance audits.'
  },
  {
    category: 'Sustainability',
    title: 'Transforming corporate footprints.',
    desc: 'How CarbonSynqEarth helps enterprises track, reduce, and offset their operational emissions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    fullText: 'The modern corporate space is evolving. CarbonSynqEarth is leading the charge by integrating smart IoT sensors directly into enterprise facilities to track energy consumption, waste, and water usage in real-time. By transforming raw data into actionable sustainability metrics, we empower organizations to make immediate adjustments, reducing their overall footprint and inspiring a deep commitment to environmental stewardship across their workforce.'
  },
  {
    category: 'Global Reach',
    title: 'Scaling net-zero across continents.',
    desc: 'CarbonSynqEarth is expanding its network to help multinational corporations achieve net-zero.',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800&auto=format&fit=crop',
    fullText: 'Achieving net-zero emissions requires a global approach. CarbonSynqEarth is proud to announce the expansion of our software services across North America, Europe, and Asia. Our localized carbon compliance modules now natively support the EU\'s CSRD, California\'s SB 253, and India\'s BRSR mandates. This global expansion ensures that multinational enterprises have a unified, compliant, and highly accurate carbon ledger, no matter where their operations or suppliers are located.'
  },
]

const moreArticles = [
  {
    category: 'Innovation',
    title: 'The future of decentralized ledgers.',
    desc: 'How blockchain is securing carbon credit tracking across borders and multi-tier supply chains.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    fullText: 'Double-counting is a critical flaw in the modern carbon offset market. CarbonSynqEarth solves this using an immutable, decentralized ledger system. Every ton of carbon tracked or offset on our platform is tokenized, creating a transparent and unalterable chain of custody from the point of reduction to the final corporate report. This innovation ensures total market trust and prevents greenwashing on a global scale.'
  },
  {
    category: 'Policy',
    title: 'Navigating the new SEC climate mandates.',
    desc: 'A comprehensive guide for enterprise leaders on preparing for the upcoming global regulatory changes.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    fullText: 'Regulatory landscapes are shifting rapidly. With the SEC\'s new climate disclosure rules, enterprises can no longer rely on estimates. CarbonSynqEarth\'s latest policy guide breaks down exactly what Chief Sustainability Officers need to know about the upcoming mandates. We explain how our audit-ready reporting engine can automatically format your real-time supply chain data to meet these exact legal requirements, eliminating the risk of massive compliance fines.'
  },
  {
    category: 'Partnerships',
    title: 'CarbonSynqEarth teams up with Global Green.',
    desc: 'Announcing our latest strategic partnership to accelerate global reforestation and carbon offsetting.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    fullText: 'We are thrilled to announce a strategic partnership with the Global Green Initiative. By integrating their verified reforestation data directly into the CarbonSynqEarth dashboard, our enterprise clients can now purchase, track, and verify high-quality carbon offsets seamlessly. This partnership bridges the gap between software analytics and real-world environmental action, planting a tree for every ton of carbon mitigated through our platform.'
  },
]

const Newsroom = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{category: string, title: string, desc: string, image: string, fullText: string} | null>(null);

  return (
    <section className="news-section" id="news">
      <div className="news-container">
        <div className="news-header">
          <div className="header-left">
            <div className="news-tag">
              <span className="dot" /> LIVE HEADLINES
            </div>
            <h2 className="news-title">Newsroom</h2>
          </div>
          <a 
            href="#" 
            className="view-all-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowAll(!showAll);
            }}
          >
            {showAll ? 'HIDE ARTICLES' : 'VIEW ALL ARTICLES'} <span>{showAll ? '↑' : '→'}</span>
          </a>
        </div>

        {/* Featured Card */}
        <div 
          className="featured-article"
          onClick={() => {
            if (!showAll) {
              setSelectedArticle(featuredArticle);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="featured-image">
            <img src={featuredArticle.image} alt="Featured Insight" />
          </div>
          <div className="featured-overlay">
            <div className="featured-tag">{featuredArticle.category}</div>
            <h3 className="featured-title">
              {featuredArticle.title}
            </h3>
            <p className="featured-desc">
              {featuredArticle.desc}
            </p>
            <span 
              className="download-link"
              onClick={(e) => {
                e.stopPropagation(); // parent click prevent karega
                if (showAll) {
                  window.location.href = '/'; // Redirect only if "DOWNLOAD REPORT"
                } else {
                  setSelectedArticle(featuredArticle); // Open modal if "READ FULL STORY"
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {showAll ? 'DOWNLOAD REPORT' : 'READ FULL STORY'} <span>→</span>
            </span>
          </div>
        </div>

        {/* Article Grid */}
        <div className="article-grid">
          {articles.map((article, index) => (
            <div
              key={index}
              className="article-card"
              onClick={() => setSelectedArticle(article)}
              style={{ cursor: 'pointer' }}
            >
              <div className="article-image">
                <img src={article.image} alt={article.category} />
              </div>
              <div className="article-content">
                <h4 className="article-category">{article.category}</h4>
                <p className="article-desc">{article.desc}</p>
                <span className="read-more">
                  READ ARTICLE <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Articles */}
        
          {showAll && (
            <div
              style={{ overflow: 'hidden' }}
            >
              <div className="article-grid">
                {moreArticles.map((article, index) => (
                  <div
                    key={index}
                    className="article-card"
                    onClick={() => setSelectedArticle(article)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="article-image">
                      <img src={article.image} alt={article.category} />
                    </div>
                    <div className="article-content">
                      <h4 className="article-category">{article.category}</h4>
                      <p className="article-desc">{article.desc}</p>
                      <span className="read-more">
                        READ ARTICLE <span>→</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        
      </div>

      {/* Article Reading Modal */}
      
        {selectedArticle && (
          <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div 
              className="article-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="article-modal-close" onClick={() => setSelectedArticle(null)}>×</button>
              <div className="article-modal-image">
                <img src={selectedArticle.image} alt={selectedArticle.category} />
              </div>
              <div className="article-modal-text">
                <div className="article-modal-tag">{selectedArticle.category}</div>
                <h3 className="article-modal-title">{selectedArticle.title}</h3>
                <div className="article-modal-divider"></div>
                <p className="article-modal-body">{selectedArticle.fullText}</p>
              </div>
            </div>
          </div>
        )}
      
    </section>
  )
}

export default Newsroom
