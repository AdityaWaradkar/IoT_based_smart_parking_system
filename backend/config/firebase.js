import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Replace these values with your actual Firebase service account information
const serviceAccount = {
  type: "service_account",
  project_id: "smart-parking-system-c435c",
  private_key_id: "95cd61d24af0e3cb5ab87e0c24e20f445f69cecd",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCW2+SCpFuXDhZF\n7WrcVlgrB2DLf0whU6WFzZPmMS3EatRWZbagWogK+tlSU7DcKaWTrKmPtuazfsJA\ndfzs9jw8QjdQ7WOPnLejzfO3+++W8G7OJf3KGURzkf2G6E708c4PQOnVG/7lcJjp\nyJC0XlT1L/1lmH6KXpyKBhbM/unSRAKmwrY9YCrk/hkNUuXzhrIvbZKVrjHQMc2W\nrdHM7dMmpjWNuIjamZAaZzwEh5zgsjvikrpijfr7rHUgVCg0ts8QnAqi1Ae5LBDW\nNar4/IVxxmSZSzW+gcYGdyKg8QBlZSQVRC1jpz+qm+q3XxgbM3lGku67eej/fQlS\nN3QU5EqpAgMBAAECggEAAxpaxOUkjSLZCm8rt4R/I8NvFkB0DGtwCCSGWkHAsz2P\nSIenDf1OtwsZ1Turc5vXsAXpJu+YJzEARdsnbKhT7Nlf0eZQGfAbRt9BmBMyhmRD\nozHc2n9SjR3/nPrCRP+EQYQQSzXcNFPwkT5y24LlNHXcPG66i5YOmjgt1+GWZaDA\nZ3McKD+Vlkxuc0bT+ZxiwVLhekcYlgIj5V1f+J4HOhotHMGokuyUGCrIKpacWXRI\n9HjQw2D1evr5WR4dyZndzDKN/63xmD8ilN9YQpgybs/QKUudSHLdwVbFRwqGPA04\nRIjzkgChrQJLsjeBU2td5OuqvnBE1uPKYgMuZ1iIUQKBgQDHA6chWYR2x6tRB4iA\n/c35ZrNe0QvBSlCPiosapFnk5dHpLcICNXUgQHMv8M3P2RLfgfieIpg3DsBJAJ4J\nVhGZaRsHxTqNWxrwutOq7w/cucibv8wUq9tzkaMyJ+MmOS98lT/OKiA2Zfozd7oj\ngZniEQWTvRTk6YTFjAQnjpej5wKBgQDCDk9P4mNUzS1qpFA72xDFX5X3iUX6kYQ0\nRBuf/ah4e9CmNyz3uKyZfX16uY92awPvmsIjDLyg/k7dGn7f33iBOgxeW7YaPIED\n/6t4dDASf1nlgWul/6FYfpp4GuVZTbzPbY3Y92Zuv7MNwC0EwbrD+T5qi+A3JEiL\nmRWYAlLK7wKBgEqpoSsO1XZmhGw64khab8rwb7zTupBCnCSt+m/9VshcPDs58n43\npgB6jXxf4CbpLn5x2V8iZW7KdvMsax3fj2y5lO1+XfAoTNwhi0WmuJG7lXpxI1Ri\nAUvDSLGJa1usupcHu09SWJFwAsUKVuf5OE0qy6fYmR0kSq5+UBSzF0rjAoGAVBiB\ndHwGUeysvudAQgA4b2ByDBj4M5M2OLQ/SIFTrgryK+YDXcMxQT8pzrJ1onrT9NUb\nRrcxU4+Bu73Mt9YPUelHDOkvrIUF4Ca/N28amhmIarZAYWq7kC8lX+E//Qh8R2QR\nsbHdOSdoQBBFMieGeYEc9G1zmFHoAl8wBXUUTg8CgYAZjMF+vTJ1B6P8i/BoDhv7\nrJUNIm5q9OzltQOMQZxAY99SFutprK8QwsUS4YqsdCJym5LUUUvggMbWISWx27Rq\npvVcpe9NhsYihl6apYfAafNVXFKgnGlr26YqjJMNp0HVpsdKbFGXbPq+U58bgINK\nfwh2Qimu8z5zmvPiVsQLJQ==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-156bu@smart-parking-system-c435c.iam.gserviceaccount.com",
  client_id: "116128531264759652213",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-156bu%40smart-parking-system-c435c.iam.gserviceaccount.com",
};

// Initialize Firebase app only if it's not already initialized
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();
const auth = getAuth();

export { db, auth };