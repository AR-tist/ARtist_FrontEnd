pipeline {
    agent any

    stages {
        stage('Clone Git Repository') { 
            steps {
                git branch: 'master', credentialsId: 'Jaezic', url:'https://github.com/AR-tist/ARtist_FrontEnd.git'
                echo 'Clone Git Repository'
                sh 'sudo chmod 777 -R .'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'sudo npm install'
            }
        }
        stage('Build React App') {
            steps {
                 sh 'sudo npm run build'
                 sh 'pwd'
            }
        }
    }
} 