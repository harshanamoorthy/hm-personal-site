import { useState } from 'react';

interface ScanResult {
  domain: string;
  status: string;
  certificates?: Array<{
    subject: string;
    issuer: string;
    validFrom: string;
    validTo: string;
    algorithm: string;
  }>;
  tlsVersions?: string[];
  cipherSuites?: string[];
  pqcReady?: boolean;
  error?: string;
}

export default function TLSAnalyzer() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!domain) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://pqc-test-center.appviewx.com/public-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      if (!response.ok) {
        throw new Error('Scan failed. Please check the domain and try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during the scan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">TLS Configuration Analyzer</h2>
        <p className="text-gray-600 mb-6">
          Analyze any domain's TLS configuration, certificate chain, and post-quantum cryptography readiness.
          Powered by AppViewX PQC Test Center.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            />
            <button
              onClick={handleScan}
              disabled={loading}
              className="bg-[#4B00FF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3a00cc] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Scanning...' : 'Analyze'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#4B00FF]"></div>
                <span className="text-gray-700">Analyzing TLS configuration...</span>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4 mt-6">
              <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
                <h3 className="font-bold text-green-800 mb-1">Scan Complete</h3>
                <p className="text-green-700">Domain: {result.domain}</p>
                <p className="text-green-700">Status: {result.status}</p>
              </div>

              {result.certificates && result.certificates.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Certificate Information</h3>
                  {result.certificates.map((cert, idx) => (
                    <div key={idx} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold">Subject:</span>
                          <p className="text-gray-600">{cert.subject}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Issuer:</span>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Valid From:</span>
                          <p className="text-gray-600">{cert.validFrom}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Valid To:</span>
                          <p className="text-gray-600">{cert.validTo}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Algorithm:</span>
                          <p className="text-gray-600">{cert.algorithm}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {result.pqcReady !== undefined && (
                <div className={`border rounded-lg p-6 ${result.pqcReady ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <h3 className="font-bold text-lg mb-2">Post-Quantum Cryptography Status</h3>
                  <p className={result.pqcReady ? 'text-green-700' : 'text-yellow-700'}>
                    {result.pqcReady 
                      ? '✓ This domain supports post-quantum cryptography' 
                      : '⚠ This domain does not yet support post-quantum cryptography'}
                  </p>
                </div>
              )}

              {result.tlsVersions && result.tlsVersions.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Supported TLS Versions</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.tlsVersions.map((version, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#EFE9E1] text-sm rounded-full">
                        {version}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.cipherSuites && result.cipherSuites.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Cipher Suites</h3>
                  <div className="space-y-1 text-sm text-gray-600 max-h-48 overflow-y-auto">
                    {result.cipherSuites.map((suite, idx) => (
                      <div key={idx} className="font-mono">{suite}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-[#EFE9E1] rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">About This Tool</h3>
        <p className="text-gray-700 mb-3">
          This TLS analyzer performs a comprehensive security assessment of any public domain, including:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#4B00FF]">•</span>
            <span>Certificate chain validation and expiration monitoring</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4B00FF]">•</span>
            <span>TLS version and cipher suite enumeration</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4B00FF]">•</span>
            <span>Post-quantum cryptography readiness assessment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4B00FF]">•</span>
            <span>Cryptographic algorithm analysis</span>
          </li>
        </ul>
        <p className="text-gray-600 text-sm mt-4">
          Powered by <a href="https://pqc-test-center.appviewx.com" target="_blank" rel="noopener noreferrer" className="text-[#4B00FF] hover:underline">AppViewX PQC Test Center</a>
        </p>
      </div>
    </div>
  );
}
