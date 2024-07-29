//
//  LoginView.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import SwiftUI

struct LoginView: View {
    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()
            VStack {
                Image(.logo)
                    .resizable()
                    .frame(width: 190, height: 190)
                    .padding(30)
                    
                
                TextField("E-mail", text: .constant(""))
                    .padding()
                    .foregroundColor(.green)
                    .background(Color(.systemGray5))
                    .cornerRadius(10)
                
                TextField("Password", text: .constant(""))
                    .padding()
                    .foregroundColor(.green)
                    .background(Color(.systemGray5))
                    .cornerRadius(10)
                
                HStack {
                    Text("Forgot your password?")
                        .foregroundColor(.black)
                    Text("Click here")
                        .foregroundColor(.green)
                }
                
                Text("Let's Play!")
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding()
                    .frame(width: 350, height: 57.0)
                    .background(Color.green)
                    .cornerRadius(10)
                
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
                
                Button {
                    print("Edit button was tapped")
                } label: {
                    Label("Login with Facebook                 ", systemImage: "person.2.circle.fill")
                        .padding()
                        .foregroundStyle(.white)
                        .background(.blue)
                        .cornerRadius(10)
                        .font(.title2)
                }
                
                Button {
                    print("Edit button was tapped")
                } label: {
                    Label("Login with Google                      ", systemImage: "circle.hexagonpath.fill")
                        .padding()
                        .foregroundStyle(.white)
                        .background(.red)
                        .cornerRadius(10)
                        .font(.title2)
                }
                
                
            }.padding()
        }
    }
}

#Preview {
    LoginView()
}
