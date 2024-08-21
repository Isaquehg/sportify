//
//  AuthService.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import Foundation

class AuthService {
    
    public init() {}
    
    func login(loginRequest: LoginRequest, completion: @escaping (Result<LoginResponse, Error>) -> Void) {
        let url = URL(string: "https://yourapi.com/login")! // TODO
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Codable
        do {
            request.httpBody = try JSONEncoder().encode(loginRequest)
        } catch {
            completion(.failure(error))
            return
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let data = data else {
                completion(.failure(NSError(domain: "", code: -1, userInfo: nil)))
                return
            }
            
            do {
                // Decode as `LoginResponse`
                let loginResponse = try JSONDecoder().decode(LoginResponse.self, from: data)
                self.saveToken(loginResponse.jwtToken, loginResponse.refreshToken)
                completion(.success(loginResponse))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
    
    private func saveToken(_ token: String, _ refresh: String) {
        Auth.shared.setCredentials(accessToken: token, refreshToken: refresh)
    }
    
    func getToken() -> String? {
        return Auth.shared.getAccessToken()
    }
}
