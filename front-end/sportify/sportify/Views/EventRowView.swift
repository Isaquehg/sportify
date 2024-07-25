//
//  EventRowView.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import SwiftUI

struct EventRowView: View {
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Text("SUN\n18:00")
                    .font(.caption)
                    .padding(8)
                    .background(Color.gray)
                    .cornerRadius(8)
                VStack(alignment: .leading) {
                    Text("Username or Event Name")
                        .font(.headline)
                    Text("Event Location/Address")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                Spacer()
                Text("Players\n5/22")
                    .font(.caption)
                    .padding(8)
                    .background(Color.green)
                    .cornerRadius(8)
            }
            .padding(.vertical, 4)
            
        }.padding(.horizontal).padding(.vertical, 2)
    }
}

#Preview {
    EventRowView()
}
