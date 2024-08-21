//
//  LoginView.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import SwiftUI
import Combine

struct LoginView: View {

    @EnvironmentObject var navigationManager: NavigationManager
    @ObservedObject var loginViewModel: LoginViewModel = LoginViewModel()
    
    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()
            VStack {
                Image(.logo)
                    .resizable()
                    .frame(width: 190, height: 190)
                    .padding(30)
                
                Section() {
                    TextField("Email", text: $loginViewModel.email)
                    SecureField("Password", text: $loginViewModel.password)
                }.padding()
                    
                
                HStack {
                    Text("Forgot your password?")
                        .foregroundColor(.black)
                    Text("Click here")
                        .foregroundColor(.green)
                }
                
                Button(action: {
                    loginViewModel.login()
                }) {
                    Text("Let's Play!")
                        .font(.title2)
                        .foregroundColor(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.green)
                        .cornerRadius(10)
                }
                .controlSize(.large)
                
                Divider()
                    .padding()
                
                // OAuth 2.0
                Button {
                    print("Edit button was tapped")
                } label: {
                    Label("Login with Apple                         ", systemImage: "apple.logo")
                        .padding()
                        .foregroundStyle(.white)
                        .background(.black)
                        .cornerRadius(10)
                        .font(.title2)
                }
                
                
            }.padding()
        }
    }
}

class DataPost: ObservableObject {
    var didChange = PassthroughSubject<DataPost, Never>()
    var formCompleted = false {
        didSet {
            didChange.send(self)
        }
    }
    
    func checkDetails(email: String, password: String) {
        
        let body: [String: Any] = ["data": ["email": email, "password": password]]
                
        let jsonData = try? JSONSerialization.data(withJSONObject: body)
                
        let url = URL(string: "https://sportify.com/login")!
        var request = URLRequest(url: url)
        
        request.httpMethod = "POST"
        
        request.setValue("\(String(describing: jsonData?.count))", forHTTPHeaderField: "Content-Length")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        request.httpBody = jsonData

        print(body)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print(error?.localizedDescription ?? "No data")
                return
            }

            let responseJSON = try? JSONSerialization.jsonObject(with: data, options: [])
            if let responseJSON = responseJSON as? [String: Any] {
                print(responseJSON)
            }
        }

        task.resume()
    }
}

#Preview {
    LoginView()
}
