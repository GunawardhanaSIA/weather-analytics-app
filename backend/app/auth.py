from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import requests
from .config import AUTH0_DOMAIN, ALGORITHMS, AUTH0_API_AUDIENCE, HS256_SECRET

http_bearer = HTTPBearer()

jwks = requests.get(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json").json()

def get_rsa_key(token):
    header = jwt.get_unverified_header(token)

    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            return {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }

    raise HTTPException(status_code=401, detail="Invalid token")


def verify_jwt(credentials: HTTPAuthorizationCredentials = Security(http_bearer)):
    token = credentials.credentials
    print("=== Incoming token ===")
    print(token[:20] + "...")
    rsa_key = get_rsa_key(token)
    print("=== RSA Key obtained ===")
    print(rsa_key)

    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            # audience=AUTH0_API_AUDIENCE,
            options={"verify_aud": False},
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        print("=== Decoded JWT payload ===")
        print(payload)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTClaimsError:
        raise HTTPException(status_code=401, detail="Incorrect claims")
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))