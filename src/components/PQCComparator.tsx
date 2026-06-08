import { useState } from 'react';

type Algorithm = 'RSA-2048' | 'RSA-4096' | 'ECDSA-P256' | 'ML-DSA-44' | 'ML-DSA-65' | 'ML-DSA-87';
type KeyExchange = 'ECDH-P256' | 'ECDH-P384' | 'ML-KEM-512' | 'ML-KEM-768' | 'ML-KEM-1024';

interface AlgorithmData {
  name: string;
  keySize: number;
  sigSize: number;
  quantumSafe: boolean;
  nistLevel: number;
  description: string;
  publicKeySize: number;
  privateKeySize: number;
}

interface KeyExchangeData {
  name: string;
  publicKeySize: number;
  ciphertextSize: number;
  sharedSecretSize: number;
  quantumSafe: boolean;
  nistLevel: number;
  description: string;
}

const signatureAlgorithms: Record<Algorithm, AlgorithmData> = {
  'RSA-2048': {
    name: 'RSA-2048',
    keySize: 2048,
    sigSize: 256,
    quantumSafe: false,
    nistLevel: 0,
    description: 'Traditional RSA with 2048-bit keys. Vulnerable to quantum attacks.',
    publicKeySize: 2048,
    privateKeySize: 2048,
  },
  'RSA-4096': {
    name: 'RSA-4096',
    keySize: 4096,
    sigSize: 512,
    quantumSafe: false,
    nistLevel: 0,
    description: 'Larger RSA keys for increased classical security. Still quantum-vulnerable.',
    publicKeySize: 4096,
    privateKeySize: 4096,
  },
  'ECDSA-P256': {
    name: 'ECDSA-P256',
    keySize: 256,
    sigSize: 64,
    quantumSafe: false,
    nistLevel: 0,
    description: 'Elliptic curve signature. Efficient but quantum-vulnerable.',
    publicKeySize: 256,
    privateKeySize: 256,
  },
  'ML-DSA-44': {
    name: 'ML-DSA-44',
    keySize: 1312,
    sigSize: 2420,
    quantumSafe: true,
    nistLevel: 2,
    description: 'Post-quantum signature (NIST FIPS 204). Security level 2.',
    publicKeySize: 1312,
    privateKeySize: 2560,
  },
  'ML-DSA-65': {
    name: 'ML-DSA-65',
    keySize: 1952,
    sigSize: 3309,
    quantumSafe: true,
    nistLevel: 3,
    description: 'Post-quantum signature (NIST FIPS 204). Security level 3.',
    publicKeySize: 1952,
    privateKeySize: 4032,
  },
  'ML-DSA-87': {
    name: 'ML-DSA-87',
    keySize: 2592,
    sigSize: 4627,
    quantumSafe: true,
    nistLevel: 5,
    description: 'Post-quantum signature (NIST FIPS 204). Security level 5.',
    publicKeySize: 2592,
    privateKeySize: 4896,
  },
};

const keyExchangeAlgorithms: Record<KeyExchange, KeyExchangeData> = {
  'ECDH-P256': {
    name: 'ECDH-P256',
    publicKeySize: 256,
    ciphertextSize: 256,
    sharedSecretSize: 256,
    quantumSafe: false,
    nistLevel: 0,
    description: 'Elliptic curve Diffie-Hellman. Fast but quantum-vulnerable.',
  },
  'ECDH-P384': {
    name: 'ECDH-P384',
    publicKeySize: 384,
    ciphertextSize: 384,
    sharedSecretSize: 384,
    quantumSafe: false,
    nistLevel: 0,
    description: 'Larger ECDH for increased classical security. Still quantum-vulnerable.',
  },
  'ML-KEM-512': {
    name: 'ML-KEM-512',
    publicKeySize: 800,
    ciphertextSize: 768,
    sharedSecretSize: 256,
    quantumSafe: true,
    nistLevel: 1,
    description: 'Post-quantum key encapsulation (NIST FIPS 203). Security level 1.',
  },
  'ML-KEM-768': {
    name: 'ML-KEM-768',
    publicKeySize: 1184,
    ciphertextSize: 1088,
    sharedSecretSize: 256,
    quantumSafe: true,
    nistLevel: 3,
    description: 'Post-quantum key encapsulation (NIST FIPS 203). Security level 3.',
  },
  'ML-KEM-1024': {
    name: 'ML-KEM-1024',
    publicKeySize: 1568,
    ciphertextSize: 1568,
    sharedSecretSize: 256,
    quantumSafe: true,
    nistLevel: 5,
    description: 'Post-quantum key encapsulation (NIST FIPS 203). Security level 5.',
  },
};

export default function PQCComparator() {
  const [sigAlgo1, setSigAlgo1] = useState<Algorithm>('RSA-2048');
  const [sigAlgo2, setSigAlgo2] = useState<Algorithm>('ML-DSA-65');
  const [kemAlgo1, setKemAlgo1] = useState<KeyExchange>('ECDH-P256');
  const [kemAlgo2, setKemAlgo2] = useState<KeyExchange>('ML-KEM-768');

  const sig1 = signatureAlgorithms[sigAlgo1];
  const sig2 = signatureAlgorithms[sigAlgo2];
  const kem1 = keyExchangeAlgorithms[kemAlgo1];
  const kem2 = keyExchangeAlgorithms[kemAlgo2];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Post-Quantum Algorithm Comparator</h2>
        <p className="text-gray-600 mb-6">
          Compare traditional cryptographic algorithms with their post-quantum counterparts.
          See the trade-offs in key sizes, security levels, and quantum resistance.
        </p>

        {/* Signature Algorithms */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Digital Signatures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Traditional Algorithm
              </label>
              <select
                value={sigAlgo1}
                onChange={(e) => setSigAlgo1(e.target.value as Algorithm)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
              >
                <option value="RSA-2048">RSA-2048</option>
                <option value="RSA-4096">RSA-4096</option>
                <option value="ECDSA-P256">ECDSA-P256</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post-Quantum Algorithm
              </label>
              <select
                value={sigAlgo2}
                onChange={(e) => setSigAlgo2(e.target.value as Algorithm)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
              >
                <option value="ML-DSA-44">ML-DSA-44 (Dilithium2)</option>
                <option value="ML-DSA-65">ML-DSA-65 (Dilithium3)</option>
                <option value="ML-DSA-87">ML-DSA-87 (Dilithium5)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">{sig1.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${sig1.quantumSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {sig1.quantumSafe ? '🟢 Quantum-Safe' : '🔴 Quantum-Vulnerable'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{sig1.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Public Key:</span>
                  <span className="font-mono font-semibold">{sig1.publicKeySize} bits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Signature Size:</span>
                  <span className="font-mono font-semibold">{sig1.sigSize} bytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NIST Level:</span>
                  <span className="font-mono font-semibold">{sig1.nistLevel || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EFE9E1] p-6 rounded-lg border-2 border-[#4B00FF]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">{sig2.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${sig2.quantumSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {sig2.quantumSafe ? '🟢 Quantum-Safe' : '🔴 Quantum-Vulnerable'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{sig2.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Public Key:</span>
                  <span className="font-mono font-semibold">{sig2.publicKeySize} bits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Signature Size:</span>
                  <span className="font-mono font-semibold">{sig2.sigSize} bytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NIST Level:</span>
                  <span className="font-mono font-semibold">{sig2.nistLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Exchange */}
        <div>
          <h3 className="text-xl font-bold mb-4">Key Exchange / Encapsulation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Traditional Algorithm
              </label>
              <select
                value={kemAlgo1}
                onChange={(e) => setKemAlgo1(e.target.value as KeyExchange)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
              >
                <option value="ECDH-P256">ECDH-P256</option>
                <option value="ECDH-P384">ECDH-P384</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post-Quantum Algorithm
              </label>
              <select
                value={kemAlgo2}
                onChange={(e) => setKemAlgo2(e.target.value as KeyExchange)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B00FF]"
              >
                <option value="ML-KEM-512">ML-KEM-512 (Kyber512)</option>
                <option value="ML-KEM-768">ML-KEM-768 (Kyber768)</option>
                <option value="ML-KEM-1024">ML-KEM-1024 (Kyber1024)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">{kem1.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${kem1.quantumSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {kem1.quantumSafe ? '🟢 Quantum-Safe' : '🔴 Quantum-Vulnerable'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{kem1.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Public Key:</span>
                  <span className="font-mono font-semibold">{kem1.publicKeySize} bits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ciphertext:</span>
                  <span className="font-mono font-semibold">{kem1.ciphertextSize} bytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NIST Level:</span>
                  <span className="font-mono font-semibold">{kem1.nistLevel || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EFE9E1] p-6 rounded-lg border-2 border-[#4B00FF]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">{kem2.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${kem2.quantumSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {kem2.quantumSafe ? '🟢 Quantum-Safe' : '🔴 Quantum-Vulnerable'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{kem2.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Public Key:</span>
                  <span className="font-mono font-semibold">{kem2.publicKeySize} bits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ciphertext:</span>
                  <span className="font-mono font-semibold">{kem2.ciphertextSize} bytes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NIST Level:</span>
                  <span className="font-mono font-semibold">{kem2.nistLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EFE9E1] rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">Understanding the Trade-offs</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Key Sizes:</strong> Post-quantum algorithms require larger keys (2-5x) compared to traditional algorithms. This impacts storage and transmission overhead.
          </p>
          <p>
            <strong>Signature Sizes:</strong> ML-DSA signatures are significantly larger than RSA/ECDSA signatures, which can affect bandwidth in high-volume scenarios.
          </p>
          <p>
            <strong>NIST Security Levels:</strong> Level 1 = AES-128, Level 3 = AES-192, Level 5 = AES-256 equivalent quantum security.
          </p>
          <p>
            <strong>Quantum Threat:</strong> While traditional algorithms are secure against classical computers, they become vulnerable once large-scale quantum computers exist. Post-quantum algorithms are designed to resist both classical and quantum attacks.
          </p>
        </div>
      </div>
    </div>
  );
}
