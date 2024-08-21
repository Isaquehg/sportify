//
//  Auth.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 21/08/24.
//

import Foundation
import KeychainSwift

class Auth: ObservableObject {
    
    struct Credentials {
        var accessToken: String?
        var refreshToken: String?
    }
    
    static let shared: Auth = Auth()
    private let keychain = KeychainSwift()
    
    @Published var loggedIn: Bool = false
    
    private init() {
        loggedIn = hasAccessToken()
    }
    
    func getCredentials() -> Credentials {
        return Credentials(
            accessToken: keychain.get("jwtToken"),
            refreshToken: keychain.get("refreshToken")
        )
    }
    
    func setCredentials(accessToken: String, refreshToken: String) {
        keychain.set(accessToken, forKey: "jwtToken")
        keychain.set(refreshToken, forKey: "refreshToken")
        
        loggedIn = true
    }
    
    func hasAccessToken() -> Bool {
            return getCredentials().accessToken != nil
    }
    
    func getAccessToken() -> String? {
        return getCredentials().accessToken
    }

    func getRefreshToken() -> String? {
        return getCredentials().refreshToken
    }

    func logout() {
        keychain.delete("jwtToken")
        keychain.delete("refreshToken")
        
        loggedIn = false
    }
        
}
