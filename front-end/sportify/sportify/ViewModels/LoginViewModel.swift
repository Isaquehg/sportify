//
//  LoginViewModel.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import Foundation

class LoginViewModel: ObservableObject {
    
    init() {}

    @Published var email: String = ""
    @Published var password: String = ""
    
    // Action after login
    @Published var errorMessage: String?

    private let navigationManager: NavigationManager = NavigationManager()
    private let authService = AuthService()

    func login() {
        let loginRequest = LoginRequest(email: email, password: password)
        
        authService.login(loginRequest: loginRequest) { [weak self] (result) in
            DispatchQueue.main.async {
                switch result {
                    case .success(_):
                        self?.navigationManager.currentView = .main
                    case .failure(let error):
                        // Store error message
                        self?.errorMessage = error.localizedDescription
                }
            }
        }
    }
}
