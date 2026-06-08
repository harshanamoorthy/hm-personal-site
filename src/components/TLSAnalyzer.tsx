import { useState } from 'react';

type ScanStatus = 'idle' | 'submitting' | 'analyzing' | 'complete' | 'error';

interface ScanState {
  status: ScanStatus;
  message: string;
  token?: string;
}

export default function TLSAnalyzer() {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('harshana.moorthy@appviewx.com');
  const [scanState, setScanState] = useState<ScanState>({ 
    status: 'idle', 
    message: '' 
  });

  const handleScan = async () => {
    if (!domain) {
      setScanState({ 
        status: 'error', 
        message: 'Please enter a domain' 
      });
      return;
    }

    setScanState({ 
      status: 'submitting', 
      message: 'Submitting scan request...' 
    });

    try {
      const response = await fetch('https://pqc-test-center.appviewx.com/public-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          domain: domain.trim(),
          email: email.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit scan request');
      }

      const data = await response.json();
      
      if (data.token) {
        setScanState({ 
          status: 'analyzing', 
          message: `Analysis in progress. Results will be sent to ${email}`,
          token: data.token
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setScanState({ 
        status: 'error', 
        message: err instanceof Error ? err.message : 'An error occurred during the scan'
      });
    }
  };

  const getStatusColor = () => {
    switch (scanState.status) {
      case 'error': return 'bg-red-50 border-red-200 text-red-700';
      case 'analyzing': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'complete': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getStatusIcon = () => {
    switch (scanState.status) {
      case 'error': return '🔴';
      case 'analyzing': return '🟡';
      case 'complete': return '🟢';
      default: return '🔵';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">TLS Configuration Analyzer</h2>
        <p className="text-gray-600 mb-6">
          Analyze any domain's TLS configuration, certificate chain, and post-quantum cryptography readiness.
          Results will be sent to your email address. Powered by AppViewX PQC Test Center.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email (for results)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={scanState.status === 'submitting' || scanState.status === 'analyzing'}
            className="w-full bg-[#4B00FF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3a00cc] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {scanState.status === 'submitting' ? 'Submitting...' : 
             scanState.status === 'analyzing' ? 'Analyzing...' : 
             'Analyze Domain'}
          </button>

          {scanState.status !== 'idle' && (
            <div className={`${getStatusColor()} border px-6 py-4 rounded-lg`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getStatusIcon()}</span>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">
                    {scanState.status === 'error' ? 'Unable to Execute' :
                     scanState.status === 'submitting' ? 'Submitting Request' :
                     scanState.status === 'analyzing' ? 'Analysis in Progress' :
                     'Complete'}
                  </h3>
                  <p>{scanState.message}</p>
                  {scanState.token && (
                    <p className="text-sm mt-2 font-mono">Token: {scanState.token}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {scanState.status === 'analyzing' && (
            <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> The analysis typically takes 1-2 minutes. Check your email inbox ({email}) for the detailed TLS configuration report including:
              </p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1 ml-4">
                <li>• Certificate chain validation</li>
                <li>• TLS version and cipher suite analysis</li>
                <li>• Post-quantum cryptography readiness</li>
                <li>• Security recommendations</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-[#EFE9E1] rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">About This Tool</h3>
        <p className="text-gray-700 mb-3">
          This TLS analyzer performs a comprehensive security assessment of any public domain:
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
