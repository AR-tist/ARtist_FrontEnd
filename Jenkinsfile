pipeline {
    agent any

    stages {
        stage('Clone Git Repository') { 
            steps {
                git branch: 'master', credentialsId: 'Jaezic', url:'https://github.com/AR-tist/ARtist_FrontEnd.git'
                echo 'Clone Git Repository'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'sudo -u ubuntu npm install'
            }
        }
        stage('Build React App') {
            steps {
                 sh 'sudo -u ubuntu npm run build'
                 sh 'pwd'
            }
        }
    }
} 