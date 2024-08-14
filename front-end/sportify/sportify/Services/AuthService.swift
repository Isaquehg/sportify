//
//  AuthService.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import Foundation

class AuthService {
    
    static let shared = AuthService()
    
    private init() {}
    
    func login(email: String, password: String, completion: @escaping (Result<String, Error>) -> Void) {
        let url = URL(string: "https://yourapi.com/login")! // todo
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "email": email,
            "password": password
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: .fragmentsAllowed)
        
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
                let json = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String: Any]
                if let token = json?["token"] as? String {
                    self.saveToken(token)
                    completion(.success(token))
                } else {
                    completion(.failure(NSError(domain: "", code: -1, userInfo: nil)))
                }
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
    
    private func saveToken(_ token: String) {
        UserDefaults.standard.set(token, forKey: "jwtToken")
    }
    
    func getToken() -> String? {
        return UserDefaults.standard.string(forKey: "jwtToken")
    }
}
