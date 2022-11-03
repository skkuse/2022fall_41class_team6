#include<iostream>
#define MOD 15746
using namespace std;
int n, dt[1000000] = { 1, 1 };
int main() {
	cin >> n;

	for (int i = 2; i <= n; i++) {
		dt[i] = dt[i - 1] + dt[i - 2];
		dt[i] %= MOD;
	}

	cout << dt[n];
}