//
//  LoginViewModel.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import Foundation

class LoginViewModel: ObservableObject {
    
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var isLoggedIn: Bool = false
    @Published var errorMessage: String?
    
    func login() {
        AuthService.shared.login(email: email, password: password) { 
            [weak self] result in DispatchQueue.main.async {
                switch result {
                    case .success(let token):
                        print("Logged in with token: \(token)")
                        self?.isLoggedIn = true
                    case .failure(let error):
                        self?.errorMessage = error.localizedDescription
                        self?.isLoggedIn = false
                }
            }
        }
    }
    
}
